# Ruixen UI

A high-level component library built on top of shadcn/ui with Tailwind CSS and TypeScript, designed for Next.js applications.

## Installation

### Quick Start

```bash
npx ruixen-ui@latest init
```

### Adding Components

```bash
# Add specific components
npx ruixen-ui@latest add button card form

# Add all components
npx ruixen-ui@latest add --all
```

### Using as a Package

```bash
npm install ruixen-ui
```

### Usage Example

```tsx
import { Button, Card, FormBuilder } from 'ruixen-ui';

function MyApp() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Welcome</Card.Title>
      </Card.Header>
      <Card.Content>
        <Button variant="gradient" loading>
          Click me
        </Button>
      </Card.Content>
    </Card>
  );
}
```

## CLI Commands

### Initialize Project

```bash
npx ruixen-ui@latest init
```

Options:
- `--yes` - Skip confirmation prompts
- `--typescript` - Initialize with TypeScript (default)
- `--javascript` - Initialize with JavaScript

### Add Components

```bash
npx ruixen-ui@latest add <component-name>
```

Options:
- `--yes` - Skip confirmation prompts
- `--overwrite` - Overwrite existing files

### List Components

```bash
npx ruixen-ui@latest list
```

## Configuration

After running `init`, a `ruixen-ui.json` file will be created in your project root:

```json
{
  "$schema": "https://ruixen.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "ruixen": "@/components/ruixen"
  }
}
```

## Component Examples

### Button Component

```tsx
import { Button } from '@/components/ruixen/button';

function Example() {
  return (
    <div className="space-x-4">
      <Button variant="default">Default</Button>
      <Button variant="gradient">Gradient</Button>
      <Button variant="outline" loading>Loading</Button>
      <Button size="lg" variant="success">Success</Button>
    </div>
  );
}
```

### Button_01 Component (Slide to Delete)

```tsx
import Button_01 from '@/components/ruixen/button-01';

function DeleteExample() {
  const handleConfirm = () => {
    console.log('Item deleted!');
  };

  return (
    <div className="space-y-4">
      <Button_01 
        onConfirm={handleConfirm}
        slideText="Slide to Delete"
        confirmText="Deleted!"
      />
      
      <Button_01 
        variant="confirm"
        slideText="Slide to Confirm"
        confirmText="Confirmed!"
        onConfirm={() => console.log('Confirmed!')}
      />
      
      <Button_01 
        variant="warning"
        slideText="Slide to Proceed"
        confirmText="Done!"
        icon={<AlertTriangle className="w-4 h-4" />}
      />
    </div>
  );
}
```

### Form Builder

```tsx
import { FormBuilder } from '@/components/ruixen/form';

function ContactForm() {
  const fields = [
    { name: 'name', label: 'Name', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'message', label: 'Message', type: 'textarea', required: true }
  ];

  const handleSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <FormBuilder
      fields={fields}
      onSubmit={handleSubmit}
      submitText="Send Message"
    />
  );
}
```

### Data Table

```tsx
import { DataTable } from '@/components/ruixen/data-table';

function UsersTable() {
  const columns = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'role', header: 'Role' },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <Button size="sm" variant="outline">
          Edit
        </Button>
      )
    }
  ];

  const data = [
    { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      searchable
      pageSize={10}
    />
  );
}
```

## License

MIT License - see LICENSE file for details.

## Support

- 📖 [Documentation](https://ruixen.com)
- 🐛 [Issue Tracker](https://github.com/ruixen/ruixen-ui/issues)
- 💬 [Discussions](https://github.com/ruixen/ruixen-ui/discussions)