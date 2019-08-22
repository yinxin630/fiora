import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Prism from 'prismjs';

import Style from './CodeMessage.less';
import Dialog from '../../../components/Dialog';
import Button from '../../../components/Button';
import Message from '../../../components/Message';

const languagesMap = {
    javascript: 'javascript',
    typescript: 'typescript',
    java: 'java',
    c_cpp: 'cpp',
    python: 'python',
    ruby: 'ruby',
    php: 'php',
    golang: 'go',
    csharp: 'csharp',
    html: 'html',
    css: 'css',
    markdown: 'markdown',
    sql: 'sql',
    json: 'json',
};

interface CodeMessageProps {
    code: string;
}

function CodeMessage(props: CodeMessageProps) {
    const { code } = props;
    const parseResult = /@language=([_a-z]+)@/.exec(code);
    if (!parseResult) {
        return <pre className="code">不支持的编程语言</pre>;
    }

    const [codeDialog, toggleCodeDialog] = useState(false);

    const language = languagesMap[parseResult[1]];
    const rawCode = code.replace(/@language=[_a-z]+@/, '');
    const html = Prism.highlight(rawCode, Prism.languages[language]);
    setTimeout(Prism.highlightAll.bind(Prism), 0); // TODO: https://github.com/PrismJS/prism/issues/1487
    let size = `${rawCode.length}B`;
    if (rawCode.length > 1024) {
        size = `${Math.ceil((rawCode.length / 1024) * 100) / 100}KB`;
    }

    return (
        <>
            <div className={Style.codeMessage} onClick={() => toggleCodeDialog(true)} role="button">
                <div className={Style.codeInfo}>
                    <div className={Style.icon}>
                        <i className="iconfont icon-code" />
                    </div>
                    <div>
                        <span>{language}</span>
                        <span className={Style.codeSize}>{size}</span>
                    </div>
                </div>
                <p className={Style.codeViewButton}>查看</p>
            </div>
            <Dialog
                className={Style.codeDialog}
                title="查看代码"
                visible={codeDialog}
                onClose={() => toggleCodeDialog(false)}
            >
                <CopyToClipboard text={rawCode}>
                    <Button
                        className={Style.codeDialogButton}
                        onClick={() => Message.success('已复制代码到粘贴板')}
                    >
                        复制
                    </Button>
                </CopyToClipboard>
                {codeDialog && (
                    <pre className={`${Style.pre} line-numbers`}>
                        <code
                            className={`language-${language} ${Style.code}`}
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{ __html: html }}
                        />
                    </pre>
                )}
            </Dialog>
        </>
    );
}

export default CodeMessage;
