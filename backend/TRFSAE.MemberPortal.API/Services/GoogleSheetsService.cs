using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using Google.Apis.Sheets.v4.Data;
using TRFSAE.MemberPortal.API.DTOs;
using TRFSAE.MemberPortal.API.Interfaces;
using TRFSAE.MemberPortal.API.Models;
using System.Text.Json;
using Supabase;
using Supabase.Realtime;

namespace TRFSAE.MemberPortal.API.Services
{
    public class GoogleSheetsService : IGoogleSheetsService
    {
        static readonly string[] Scopes = { SheetsService.Scope.Spreadsheets };
        static readonly string ApplicationName = "TigerRacing";
        static readonly string SpreadsheetsId = "1u-78AkyO2ZXX7h1tPM6fIJGY51xtJkbWOKu8Lw3ddfQ"; //change to letters after d/ in url
        static readonly string sheet = "sheet1"; //change to sheet name at the bottom 
        static SheetsService? service;
        private readonly Supabase.Client _supabaseClient;

        public GoogleSheetsService(Supabase.Client supabaseClient)
        {
            _supabaseClient = supabaseClient;
        }


        public static void CreateEntry(List<SheetsResponseDTO> data)
        {
            GoogleCredential credential;
            using (var stream = new FileStream("client_secret.json", FileMode.Open, FileAccess.Read)) //ask me for client_secret.json
            {
                credential = GoogleCredential.FromStream(stream)
                    .CreateScoped(Scopes);
            }

            service = new SheetsService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = ApplicationName,
            });

            if (service == null)
                throw new InvalidOperationException("Service has not been initialized.");

            var range = $"{sheet}!A:G";
            var valueRange = new ValueRange();

            var values = new List<IList<object>>() ;

            foreach (var item in data)
            {
                values.Add(
                [
                    item.PartName ?? "",
                    item.Supplier ?? "",
                    item.Price?.ToString() ?? "",
                    item.Quantity?.ToString() ?? "",
                    item.Status ?? "",
                    item.NeededBy?.ToString("yyyy-MM-dd") ?? "",
                    item.Notes ?? ""
                ]);
            }
            valueRange.Values = values;

            var appendRequest = service.Spreadsheets.Values.Append(valueRange, SpreadsheetsId, range);
            appendRequest.ValueInputOption = SpreadsheetsResource.ValuesResource.AppendRequest.ValueInputOptionEnum.USERENTERED;
            appendRequest.Execute();
        }

        public async Task<List<SheetsResponseDTO>> GetSupabase()
        {
            var result = await _supabaseClient
                .From<PurchaseItemModel>()
                .Select("*")
                .Order("created_at", Supabase.Postgrest.Constants.Ordering.Descending)
                .Limit(1)
                .Get();

            var data = JsonSerializer.Deserialize<List<SheetsResponseDTO>>(result.Content);
            return data ?? new List<SheetsResponseDTO>();
        }

        public async Task ListenToSupabaseChangesAsync()
        {
            try
            {
                var channel = await _supabaseClient
                    .From<PurchaseItemModel>()
                    .On(Supabase.Realtime.PostgresChanges.PostgresChangesOptions.ListenType.Inserts, async (sender, change) =>
                    {
                        var items = await GetSupabase();
                        if (items != null && items.Count > 0)
                        {
                            CreateEntry(items);
                        }
                        else
                        {
                            Console.WriteLine("No item found to write to Google Sheets");
                        }
                    });

                await channel.Subscribe();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in ListenToSupabaseChangesAsync: {ex.Message}");
                throw;
            }
        }

    }
}
