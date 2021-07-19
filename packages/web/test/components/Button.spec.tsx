/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button from '../../src/components/Button';

describe('Button', () => {
    it('shoule render without error', async () => {
        render(<Button>text</Button>);
        const $button = screen.getByRole('button');
        expect($button).toBeInTheDocument();
    });

    it('shoule support set custom class name and type', async () => {
        render(<Button className="custom" type="danger">text</Button>);
        const $button = screen.getByRole('button');
        expect($button.classList).toContain('custom');
        expect($button.classList).toContain('danger');
    });

    it('shoule call props handler function when fire event', async () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>text</Button>);
        const $button = screen.getByRole('button');
        fireEvent.click($button);
        expect(handleClick).toHaveBeenCalled();
    });
});
