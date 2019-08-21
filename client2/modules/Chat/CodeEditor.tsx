import React, { useState, useEffect } from 'react';
// import AceEditor from 'react-ace';
// import 'brace/theme/tomorrow';
// import 'brace/ext/language_tools';

import Style from './CodeEditor.less';
import Dialog from '../../components/Dialog';
import { Select, Option } from '../../components/Select';
import Button from '../../components/Button';

const languages = [
    'javascript',
    'typescript',
    'java',
    'c_cpp',
    'python',
    'ruby',
    'php',
    'golang',
    'csharp',
    'html',
    'css',
    'markdown',
    'sql',
    'json',
];

interface LoadedLanguage {
    [key: string]: boolean;
}
const loadedLanguage: LoadedLanguage = {};
let AceEditor: any = null;

interface CodeEditorProps {
    visible: boolean;
    onClose: () => void;
    onSend: (language: string, code: string) => void;
}

function CodeEditor(props: CodeEditorProps) {
    const { visible, onClose, onSend } = props;

    const [language, setLanguage] = useState('javascript');
    const [value, setValue] = useState('');
    const [timestamp, setTimestamp] = useState(0);

    useEffect(() => {
        (async () => {
            // 动态加载编辑器
            if (!AceEditor) {
                // @ts-ignore
                const ReactAceModule = await import(/* webpackChunkName: "react-ace-theme" */ 'react-ace');
                AceEditor = ReactAceModule.default;
                await Promise.all([
                    // @ts-ignore
                    import(/* webpackChunkName: "react-ace-theme" */ 'brace/theme/tomorrow'),
                    // @ts-ignore
                    import(/* webpackChunkName: "react-ace-tools" */ 'brace/ext/language_tools'),
                ]);
            }
            // 动态加载语言包
            if (!loadedLanguage[language]) {
                // @ts-ignore
                await import(/* webpackChunkName: "mode-javascript" */ `brace/mode/${language}`);
                loadedLanguage[language] = true;
                setTimestamp(Date.now());
            }
        })();
    }, [language]);

    function renderEditor() {
        if (!loadedLanguage[language]) {
            return null;
        }

        const editorProps = {
            theme: 'tomorrow',
            value,
            onChange: (newValue: string) => setValue(newValue),
            fontSize: 12,
            width: '100%',
            height: '100%',
            showPrintMargin: true,
            showGutter: true,
            highlightActiveLine: true,
            setOptions: {
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 4,
            },
        };

        return <AceEditor mode={language} {...editorProps} />;
    }

    return (
        <Dialog
            className={Style.codeEditor}
            title="请输入要发送的代码"
            visible={visible}
            onClose={onClose}
        >
            <div className={Style.container}>
                <div className={Style.selectContainer}>
                    <h3 className={Style.title}>编程语言: </h3>
                    <Select
                        className={Style.languageSelect}
                        defaultValue={languages[0]}
                        onSelect={(lang: string) => setLanguage(lang)}
                    >
                        {languages.map((lang) => (
                            <Option value={lang} key={lang}>
                                {lang}
                            </Option>
                        ))}
                    </Select>
                </div>
                <div className={Style.editorContainer}>{renderEditor()}</div>
                <Button className={Style.sendButton} onClick={() => onSend(language, value)}>
                    发送
                </Button>
                <span className="hide">{timestamp}</span>
            </div>
        </Dialog>
    );
}

export default CodeEditor;
