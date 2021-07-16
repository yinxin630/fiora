import React, { useState } from 'react';
import loadable from '@loadable/component';

import Style from './CodeMessage.less';

// @ts-ignore
const CodeDialogAsync = loadable(() => import(/* webpackChunkName: "code-dialog" */ './CodeDialog'));

type LanguageMap = {
    [language: string]: string;
};

const languagesMap: LanguageMap = {
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
    sql: 'sql',
    json: 'json',
    text: 'text',
};

interface CodeMessageProps {
    code: string;
}

function CodeMessage(props: CodeMessageProps) {
    const { code } = props;

    const [codeDialog, toggleCodeDialog] = useState(false);

    const parseResult = /@language=([_a-z]+)@/.exec(code);
    if (!parseResult) {
        return <pre className="code">不支持的编程语言</pre>;
    }

    const language = languagesMap[parseResult[1]] || 'text';
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
            {codeDialog && (
                <CodeDialogAsync
                    visible={codeDialog}
                    onClose={() => toggleCodeDialog(false)}
                    language={language}
                    code={rawCode}
                />
            )}
        </>
    );
}

export default CodeMessage;
