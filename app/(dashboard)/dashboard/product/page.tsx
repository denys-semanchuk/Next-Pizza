import { Container } from '@/shared/components/shared';
import React from 'react';

export const metadata = {
  title: 'Page Title',
  description: 'Page Description'
};

export default function PageNamePage() {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold mb-6">Page Title</h1>
      
    </Container>
  );
}
