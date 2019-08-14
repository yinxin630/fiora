/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-classes-per-file */
import React, { Component } from 'react';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import PropTypes from 'prop-types';

import { Select, Option } from '../../../../components/Select';

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
let AceEditor = null;

// Dynamically loads the mode file of the selected language
let editorLoadEnd = false;
const langLoadEnd = { };
function createLanguage(lang, loadFun) {
    return class AceEditorWrap extends Component {
        constructor(...args) {
            super(...args);
            this.state = {
                editorReady: editorLoadEnd,
                modeReady: !!langLoadEnd[lang],
            };
        }

        componentDidMount() {
            const { editorReady, modeReady } = this.state;
            if (!editorReady) {
                // Dynamic loading code editor
                require.ensure([], (require) => {
                    AceEditor = require('react-ace').default;
                    require('brace/theme/tomorrow');
                    require('brace/ext/language_tools');
                    this.setState({ editorReady: true });
                    loadFun.call(this);
                    langLoadEnd[lang] = true;
                }, 'react-ace');
                editorLoadEnd = true;
            } else if (!modeReady) {
                loadFun.call(this);
                langLoadEnd[lang] = true;
            }
        }

        render() {
            const { editorReady, modeReady } = this.state;
            if (!editorReady || !modeReady) {
                return (
                    <span tip="loading...">
                        <div className="loadinng" />
                    </span>
                );
            }

            return (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <AceEditor mode={lang} ref={(i) => { this.aceEditor = i; }} {...this.props} />
            );
        }
    };
}

const Javascript = createLanguage('javascript', function createJavascript() {
    require.ensure([], (require) => {
        require('brace/mode/javascript');
        this.setState({ modeReady: true });
    }, 'javascript.mode');
});
const Typescript = createLanguage('typescript', function createTypescript() {
    require.ensure([], (require) => {
        require('brace/mode/typescript');
        this.setState({ modeReady: true });
    }, 'typescript.mode');
});
const Java = createLanguage('java', function createJava() {
    require.ensure([], (require) => {
        require('brace/mode/java');
        this.setState({ modeReady: true });
    }, 'java.mode');
});
const Cpp = createLanguage('c_cpp', function createCpp() {
    require.ensure([], (require) => {
        require('brace/mode/c_cpp');
        this.setState({ modeReady: true });
    }, 'cpp.mode');
});
const Python = createLanguage('python', function createPython() {
    require.ensure([], (require) => {
        require('brace/mode/python');
        this.setState({ modeReady: true });
    }, 'python.mode');
});
const Ruby = createLanguage('ruby', function createRuby() {
    require.ensure([], (require) => {
        require('brace/mode/ruby');
        this.setState({ modeReady: true });
    }, 'ruby.mode');
});
const Php = createLanguage('php', function createPhp() {
    require.ensure([], (require) => {
        require('brace/mode/php');
        this.setState({ modeReady: true });
    }, 'php.mode');
});
const Golang = createLanguage('golang', function createGolang() {
    require.ensure([], (require) => {
        require('brace/mode/golang');
        this.setState({ modeReady: true });
    }, 'golang.mode');
});
const Csharp = createLanguage('csharp', function createCsharp() {
    require.ensure([], (require) => {
        require('brace/mode/csharp');
        this.setState({ modeReady: true });
    }, 'csharp.mode');
});
const Html = createLanguage('html', function createHtml() {
    require.ensure([], (require) => {
        require('brace/mode/html');
        this.setState({ modeReady: true });
    }, 'html.mode');
});
const Css = createLanguage('css', function createCss() {
    require.ensure([], (require) => {
        require('brace/mode/css');
        this.setState({ modeReady: true });
    }, 'css.mode');
});
const Markdown = createLanguage('markdown', function createMarkdown() {
    require.ensure([], (require) => {
        require('brace/mode/markdown');
        this.setState({ modeReady: true });
    }, 'markdown.mode');
});
const Sql = createLanguage('sql', function createSql() {
    require.ensure([], (require) => {
        require('brace/mode/sql');
        this.setState({ modeReady: true });
    }, 'sql.mode');
});
const Json = createLanguage('json', function createJson() {
    require.ensure([], (require) => {
        require('brace/mode/json');
        this.setState({ modeReady: true });
    }, 'json.mode');
});

class CodeEditor extends Component {
    static propTypes = {
        onSend: PropTypes.func.isRequired,
    }

    constructor(...args) {
        super(...args);
        this.state = {
            value: '',
            lang: languages[0],
        };
        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    getValue() {
        // eslint-disable-next-line react/destructuring-assignment
        return this.state.value;
    }

    getLanguage() {
        // eslint-disable-next-line react/destructuring-assignment
        return this.state.lang;
    }

    handleSelectLanguage = (lang) => {
        this.setState({
            lang,
        });
    }

    handleChange = (newValue) => {
        this.setState({ value: newValue });
    }

    /**
     * 清空编辑器内容
     * @memberof CodeEditor
     */
    clear() {
        this.setState({
            value: '',
        });
    }

    renderEditor() {
        const { value, lang } = this.state;
        const editorProps = {
            theme: 'tomorrow',
            onChange: this.handleChange,
            fontSize: 12,
            width: '100%',
            height: '100%',
            showPrintMargin: true,
            showGutter: true,
            highlightActiveLine: true,
            value,
            setOptions: {
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 4,
            },
            ref: (i) => { this.editor = i; },
        };
        switch (lang) {
            case 'javascript':
                return <Javascript {...editorProps} />;
            case 'typescript':
                return <Typescript {...editorProps} />;
            case 'java':
                return <Java {...editorProps} />;
            case 'c_cpp':
                return <Cpp {...editorProps} />;
            case 'python':
                return <Python {...editorProps} />;
            case 'ruby':
                return <Ruby {...editorProps} />;
            case 'php':
                return <Php {...editorProps} />;
            case 'golang':
                return <Golang {...editorProps} />;
            case 'csharp':
                return <Csharp {...editorProps} />;
            case 'html':
                return <Html {...editorProps} />;
            case 'css':
                return <Css {...editorProps} />;
            case 'markdown':
                return <Markdown {...editorProps} />;
            case 'sql':
                return <Sql {...editorProps} />;
            case 'json':
                return <Json {...editorProps} />;
            default:
                return null;
        }
    }

    render() {
        return (
            <div className="chat-codeEditor">
                <div className="select-container">
                    <h3>编程语言: </h3>
                    <Select className="language-select" defaultValue={languages[0]} onSelect={this.handleSelectLanguage}>
                        {
                            languages.map((language) => (
                                <Option value={language} key={language}>{language}</Option>
                            ))
                        }
                    </Select>
                </div>
                <div className="editor-container">
                    {this.renderEditor()}
                </div>
            </div>
        );
    }
}

export default CodeEditor;
