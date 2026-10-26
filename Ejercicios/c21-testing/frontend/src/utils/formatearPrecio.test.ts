import { describe, it, expect } from 'vitest';
import { formatearPrecio } from './formatearPrecio';

describe('formatearPrecio', () => {
    it('agrega el signo $ y el separador de miles', () => {
        expect(formatearPrecio(4500)).toBe('$ 4.500');
    });

    it('agrupa de a tres los millones', () => {
        expect(formatearPrecio(1234567)).toBe('$ 1.234.567');
    });

    it('formatea el cero', () => {
        expect(formatearPrecio(0)).toBe('$ 0');
    });
});
