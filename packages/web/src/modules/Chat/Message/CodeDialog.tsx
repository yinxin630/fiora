import React from 'react';
import Prism from 'prismjs';

import xss from '@fiora/utils/xss';
import Style from './CodeMessage.less';
import Dialog from '../../../components/Dialog';

interface CodeDialogProps {
    visible: boolean;
    onClose: () => void;
    language: string;
    code: string;
}

function CodeDialog(props: CodeDialogProps) {
    const { visible, onClose, language, code } = props;
    const html = language === 'text'
        ? xss(code)
        // @ts-ignore
        : Prism.highlight(code, Prism.languages[language]);
    setTimeout(Prism.highlightAll.bind(Prism), 0); // TODO: https://github.com/PrismJS/prism/issues/1487

    return (
        <Dialog className={Style.codeDialog} title="查看代码" visible={visible} onClose={onClose}>
            <pre className={`${Style.pre} line-numbers`}>
                <code
                    className={`language-${language} ${Style.code}`}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </pre>
        </Dialog>
    );
}

export default CodeDialog;
