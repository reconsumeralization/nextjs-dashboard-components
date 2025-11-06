# Contributing to Next.js Dashboard Components

Thank you for your interest in contributing! This component library helps developers quickly build production-ready dashboards for hackathons.

## How to Contribute

### Reporting Issues
- Check existing issues before creating a new one
- Provide clear reproduction steps
- Include Next.js version and browser details
- Share screenshots if reporting visual bugs

### Suggesting Enhancements
- Describe the enhancement and its use case
- Explain how it benefits hackathon participants
- Consider accessibility and responsive design

### Pull Requests
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-component`)
3. Make your changes
4. Test thoroughly (multiple browsers and screen sizes)
5. Commit with clear messages
6. Push to your fork
7. Open a Pull Request

### Code Guidelines
- Follow React and TypeScript best practices
- Use TypeScript for all components
- Follow the existing component structure
- Maintain accessibility standards (WCAG 2.1)
- Keep components simple and reusable
- Document props with JSDoc comments

### Component Guidelines
- Components should be framework-agnostic where possible
- Support light/dark themes
- Mobile-first responsive design
- Include loading states
- Handle errors gracefully
- Export TypeScript types

### Testing
- Test with Next.js 14+
- Verify responsive design (mobile, tablet, desktop)
- Test in Chrome, Firefox, Safari, and Edge
- Verify accessibility with screen readers
- Test with real data

### Documentation
- Update README.md for new components
- Add usage examples
- Include prop documentation
- Show visual examples in comments
- Keep documentation hackathon-focused

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/nextjs-dashboard-components.git
cd nextjs-dashboard-components

# Install dependencies
npm install

# Start development server (if in a Next.js project)
npm run dev
```

## Component Structure

```typescript
// components/my-component.tsx
'use client';

import { Card } from '@/components/ui/card';

interface MyComponentProps {
  /** Description of prop */
  title: string;
  /** Optional description */
  subtitle?: string;
}

export function MyComponent({ title, subtitle }: MyComponentProps) {
  return (
    <Card>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </Card>
  );
}
```

## Questions?

Feel free to open an issue for questions or join discussions!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
