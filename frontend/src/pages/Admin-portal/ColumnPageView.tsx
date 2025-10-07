import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
function App() {
  return (
<div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Tailwind Test */}
        <div className="bg-red-500 text-white p-4 rounded-lg">
          ✓ Tailwind is working - this should have a red background
        </div>
{/* Button Variants Test */}
        <Card>
          <CardHeader>
            <CardTitle>Button Components</CardTitle>
            <CardDescription>Testing all button variants</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button>Default Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </CardContent>
        </Card>
{/* Button Sizes Test */}
        <Card>
          <CardHeader>
            <CardTitle>Button Sizes</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </CardContent>
        </Card>
{/* Interactive Test */}
        <Card>
          <CardHeader>
            <CardTitle>Interactive Button</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => alert('shadcn is working!')}>
              Click Me to Test
            </Button>
          </CardContent>
        </Card>
</div>
    </div>
  )
}
export default App
