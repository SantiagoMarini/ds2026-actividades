import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// sin globals, Testing Library no limpia el DOM entre tests solo
afterEach(() => cleanup());
