import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import 'brace/theme/tomorrow';
import 'brace/ext/language_tools';

import Style from './CodeEditor.less';
import Dialog from '../../components/Dialog';
import { Select, Option } from '../../components/Select';
import Button from '../../components/Button';

const languages = [
    'javascript',
    'typescript',
    'text',
    'java',
    'c_cpp',
    'python',
    'ruby',
    'php',
    'golang',
    'csharp',
    'html',
    'css',
    'sql',
    'json',
];

interface LoadedLanguage {
    [key: string]: boolean;
}
const loadedLanguage: LoadedLanguage = {};

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
        if (visible) {
            setValue('');
        }
    }, [visible]);

    useEffect(() => {
        (async () => {
            // 动态加载语言包
            if (visible && !loadedLanguage[language]) {
                /**
                 * 为了减小打包产物体积, 这里是逐个引入所需的语音包
                 * 如果直接用变量路径, 会将该目录下的文件全部打包
                 * 另外不单个引入也不好设置 webpackChunkName
                 */
                switch (language) {
                    case 'javascript': {
                        // @ts-ignore
                        await import(/* webpackChunkName: "react-ace-mode-javascript" */ 'brace/mode/javascript');
                        break;
                    }
                    case 'typescript': {
                        // @ts-ignore
                        await import(/* webpackChunkName: "react-ace-mode-typescript" */ 'brace/mode/typescript');
                        break;
                    }
                    case 'java': {
                        // @ts-ignore
                        await import(/* webpackChunkName: "react-ace-mode-java" */ 'brace/mode/java');
                        break;
                    }
                    case 'c_cpp': {
                        // @ts-ignore
                        await import(/* webpackChunkName: "react-ace-mode-c_cpp" */ 'brace/mode/c_cpp');
                        break;
                    }
                    case 'python': {
                        // @ts-ignore
                        await import(/* webpackChunkName: "react-ace-mode-python" */ 'brace/mode/python');
                        break;
                    }
                    case 'ruby': {
                        // @ts-ignore
                        await import(/* webpackChunkName: "react-ace-mode-ruby" */ 'brace/mode/ruby');
                        break;
                    }
                    case 'php': {
                        // @ts-ignore
                        await import(/* webpackChunkName: "react-ace-mode-php" */ 'brace/mode/php');
                        break;
                    }
                    case 'golang': {
                        // @ts-ignore
                        await import(/* webpackChunkName: "react-ace-mode-golang" */ 'brace/mode/golang');
                        break;
                    }
                    case 'csharp': {
                        // @ts-ignore
                        await import(/* webpackChunkName: "react-ace-mode-csharp" */ 'brace/mode/csharp');
                        break;
                    }
                    case 'html': {
                        // @ts-ignore
                        await import(/* webpackChunkName: "react-ace-mode-html" */ 'brace/mode/html');
                        break;
                    }
                    case 'css': {
                        // @ts-ignore
                        await import(/* webpackChunkName: "react-ace-mode-css" */ 'brace/mode/css');
                        break;
                    }
                    case 'text': {
                        // @ts-ignore
                        await import(/* webpackChunkName: "react-ace-mode-text" */ 'brace/mode/markdown');
                        break;
                    }
                    case 'sql': {
                        // @ts-ignore
                        await import(/* webpackChunkName: "react-ace-mode-sql" */ 'brace/mode/sql');
                        break;
                    }
                    case 'json': {
                        // @ts-ignore
                        await import(/* webpackChunkName: "react-ace-mode-json" */ 'brace/mode/json');
                        break;
                    }
                    default: {
                        console.warn('不支持的语言包', language);
                    }
                }
                loadedLanguage[language] = true;
                setTimestamp(Date.now());
            }
        })();
    }, [visible, language]);

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

        return <AceEditor mode={language === 'text' ? 'markdown' : language} {...editorProps} />;
    }

    return (
        <>
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
                </div>
            </Dialog>
            <span className="hide">{timestamp}</span>
        </>
    );
}

export default CodeEditor;
