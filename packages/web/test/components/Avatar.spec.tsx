/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Avatar, { avatarFailback } from '../../src/components/Avatar';

describe('Avatar', () => {
    it('shoule render without error', async () => {
        render(<Avatar src="./1.jpg" />);
        const $img = await screen.findByRole('img');
        expect($img).toBeInTheDocument();
    });

    it('should call props handler function when fire event', async () => {
        const handleClick = jest.fn();
        const handleMouseEnter = jest.fn();
        const handleMouseLeave = jest.fn();
        render(<Avatar src="./1.jpg" onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />);
        const $img = await screen.findByRole('img');
        fireEvent.click($img);
        expect(handleClick).toBeCalled();
        fireEvent.mouseEnter($img);
        expect(handleMouseEnter).toBeCalled();
        fireEvent.mouseLeave($img);
        expect(handleMouseLeave).toBeCalled();
    });

    it('shoule use failback avatar when fetch error', async () => {
        const src = 'origin.jpg';
        render(<Avatar src={src} />);
        const $img = await screen.findByRole('img') as HTMLImageElement;
        expect($img.src).toEqual(expect.stringContaining(src));
        fireEvent.error($img);
        expect($img.src).toEqual(expect.stringContaining(avatarFailback));
        fireEvent.error($img);
        fireEvent.error($img);
    });

    it('shoule not add CDN query params', async () => {
        const src = 'data:base64/png;xxx';
        render(<Avatar src={src} />);
        const $img = await screen.findByRole('img') as HTMLImageElement;
        expect($img.src).not.toEqual(expect.stringContaining('x-oss-process='));
    });
});
