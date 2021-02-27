const React = require('react');
const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
    render() {
        const { siteConfig, language = '' } = this.props;
        const { baseUrl, docsUrl } = siteConfig;
        const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
        const langPart = `${language ? `${language}/` : ''}`;
        const docUrl = (doc) => `${baseUrl}${docsPart}${langPart}${doc}`;

        const SplashContainer = (props) => (
            <div className="homeContainer">
                <div className="homeSplashFade">
                    <div className="wrapper homeWrapper">{props.children}</div>
                </div>
            </div>
        );

        const Logo = (props) => (
            <div className="projectLogo">
                <img src={props.img_src} alt="Project Logo" />
            </div>
        );

        const ProjectTitle = (props) => (
            <h2 className="projectTitle">
                {props.title}
                <br />
                <small>{props.tagline}</small>
            </h2>
        );

        const PromoSection = (props) => (
            <div className="section promoSection">
                <div className="promoRow">
                    <div className="pluginRowBlock">{props.children}</div>
                </div>
            </div>
        );

        const Button = (props) => (
            <div className="pluginWrapper buttonWrapper">
                <a className="button" href={props.href} target={props.target}>
                    {props.children}
                </a>
            </div>
        );

        return (
            <SplashContainer>
                <Logo img_src={`${baseUrl}img/wuzeiniang.gif`} />
                <div className="inner">
                    <ProjectTitle tagline="一个有趣的开源聊天应用" title={siteConfig.title} />
                    <a
                        className="github-button"
                        href={siteConfig.repoUrl}
                        data-icon="octicon-star"
                        data-count-href="/yinxin630/fiora/stargazers"
                        data-show-count="true"
                        data-count-aria-label="# stargazers on GitHub"
                        aria-label="Star this project on GitHub"
                    >
                        Star
                    </a>
                    <PromoSection>
                        <Button href={siteConfig.url}>体验看看</Button>
                        <Button href={docUrl('install')}>安装部署</Button>
                        <Button href="https://github.com/yinxin630/fiora">查看源码</Button>
                    </PromoSection>
                </div>
            </SplashContainer>
        );
    }
}

class Index extends React.Component {
    render() {
        const { config: siteConfig, language = '' } = this.props;
        const { baseUrl } = siteConfig;

        const Block = (props) => (
            <Container padding={['bottom', 'top']} id={props.id} background={props.background}>
                <GridBlock align="center" contents={props.children} layout={props.layout} />
            </Container>
        );

        const Features = () => (
            <Block layout="threeColumn" id="features">
                {[
                    {
                        content: 'fiora 包括后端、前端、安卓 / iOS App',
                        image: `${baseUrl}img/website-app.png`,
                        imageAlign: 'top',
                        title: '多样性',
                    },
                    {
                        content:
                            'fiora 基于 node.js 开发<br/>支持 Windows / Linux / macOS 等操作系统',
                        image: `${baseUrl}img/cross-platform.png`,
                        imageAlign: 'top',
                        title: '跨平台',
                    },
                    {
                        content: 'fiora 遵循 MIT 开源许可',
                        image: `${baseUrl}img/open-source.png`,
                        imageAlign: 'top',
                        title: '开源',
                    },
                ]}
            </Block>
        );

        const JoinChat = () => (
            <Block background="light" id="join-chat">
                {[
                    {
                        content:
                            '注册一个账号加入聊天, 加入或者新的群组, 和有趣的陌生人私聊并加为好友, 你的账号和消息会永久保留',
                        image: `${baseUrl}img/undraw_youtube_tutorial.svg`,
                        imageAlign: 'right',
                        title: '加入聊天',
                    },
                ]}
            </Block>
        );

        const RichFeature = () => (
            <Block id="rich-feature">
                {[
                    {
                        content:
                            '你可以发送文本、表情、图片、代码和文件给其他人, 你还可以撤回已发送的消息, 另外你还可以修改用户名和头像, 最令人兴奋的是你可以选择或者自定义不同的主题',
                        image: `${baseUrl}img/undraw_note_list.svg`,
                        imageAlign: 'left',
                        title: '丰富的功能',
                    },
                ]}
            </Block>
        );

        const DeployByYourself = () => (
            <Block background="light" id="deploy-by-yourself">
                {[
                    {
                        content:
                            'fiora 是一个开源项目, 你可以克隆源码并部署到自己的服务器, 支持 windows / Linux and macOS 操作系统, 但是推荐您部署到 Linux 服务器上',
                        image: `${baseUrl}img/undraw_code_review.svg`,
                        imageAlign: 'right',
                        title: '自己部署',
                    },
                ]}
            </Block>
        );

        const TryItNow = () => {
            return (
                <div className="productShowcaseSection paddingBottom">
                    <h2>你是否非常感兴趣?</h2>
                    <div className="more-users">
                        <a className="button" href={siteConfig.url} target="_blank">
                            现在来试试吧
                        </a>
                    </div>
                </div>
            );
        };

        return (
            <div>
                <HomeSplash siteConfig={siteConfig} language={language} />
                <div className="mainContainer">
                    <Features />
                    <JoinChat />
                    <RichFeature />
                    <DeployByYourself />
                    <TryItNow />
                </div>
            </div>
        );
    }
}

module.exports = Index;
