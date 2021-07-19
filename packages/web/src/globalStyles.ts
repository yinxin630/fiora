// @ts-ignore
import { css } from 'linaria';

const globalStyles = css`
    :global() {
        .danger {
            background-color: #dd514c !important;

            &:hover {
                background-color: #d7342e !important;
            }
        }
    }
`;

export default globalStyles;
