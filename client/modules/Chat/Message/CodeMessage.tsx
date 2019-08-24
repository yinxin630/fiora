import React, { useState, useEffect } from 'react';

import Style from './CodeMessage.less';

let CodeDialog: any = null;

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
    const [timestamp, setTimestamp] = useState(0);

    useEffect(() => {
        (async () => {
            if (codeDialog && !CodeDialog) {
                // @ts-ignore
                const CodeDialogModule = await import(
                /* webpackChunkName: "code-dialog" */ './CodeDialog',
                );
                CodeDialog = CodeDialogModule.default;
                setTimestamp(Date.now());
            }
        })();
    }, [codeDialog]);

    const language = languagesMap[parseResult[1]];
    const rawCode = code.replace(/@language=[_a-z]+@/, '');
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
            {CodeDialog && (
                <CodeDialog
                    visible={codeDialog}
                    onClose={() => toggleCodeDialog(false)}
                    language={language}
                    code={rawCode}
                />
            )}
            <span className="hide">{timestamp}</span>
        </>
    );
}

export default CodeMessage;
