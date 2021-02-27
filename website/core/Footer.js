const React = require('react');

class Footer extends React.Component {
    docUrl(doc) {
        const baseUrl = this.props.config.baseUrl;
        const docsUrl = this.props.config.docsUrl;
        const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
        return `${baseUrl}${docsPart}${doc}`;
    }

    render() {
        const currentYear = new Date().getFullYear();
        return (
            <footer className="nav-footer" id="footer">
                <section className="sitemap">
                    <div>
                        <h5>Docs</h5>
                        <a href="/">Overview</a>
                    </div>
                    <div>
                        <h5>Community</h5>
                        <a href="https://fiora.suisuijiang.com/invite/group/5adacdcfa109ce59da3e83d3" target="_blank">Feedback</a>
                        <a href="https://github.com/yinxin630/fiora/issues" target="_blank">Issues</a>
                    </div>
                    <div>
                        <h5>More</h5>
                        <a href="https://suisuiijang.com" target="_blank">Author</a>
                        <a href="https://github.com/yinxin630/fiora" target="_blank">GitHub</a>
                    </div>
                </section>
                <section className="copyright">{this.props.config.copyright}</section>
            </footer>
        );
    }
}

module.exports = Footer;
