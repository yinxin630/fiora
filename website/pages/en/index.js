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
                    <ProjectTitle tagline={siteConfig.tagline} title={siteConfig.title} />
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
                        <Button href={siteConfig.url}>Try It Now</Button>
                        <Button href={docUrl('install')}>Install It</Button>
                        <Button href="https://github.com/yinxin630/fiora">View Source Code</Button>
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
            <Block layout="fourColumn" id="features">
                {[
                    {
                        content: 'fiora contains backend, frontend<br/>Android and iOS apps',
                        image: `${baseUrl}img/website-app.png`,
                        imageAlign: 'top',
                        title: 'Richness',
                    },
                    {
                        content:
                            'fiora is developed with node.js<br/>Supports Windows / Linux / macOS systems',
                        image: `${baseUrl}img/cross-platform.png`,
                        imageAlign: 'top',
                        title: 'Cross Platform',
                    },
                    {
                        content: 'fiora follows the MIT open source license',
                        image: `${baseUrl}img/open-source.png`,
                        imageAlign: 'top',
                        title: 'Open Source',
                    },
                ]}
            </Block>
        );

        const JoinChat = () => (
            <Block background="light" id="join-chat">
                {[
                    {
                        content:
                            'Register an account to join the chat. Join or create new group. Chat privately with funny strangers and add them as friends. Your account and messages will be stored forever',
                        image: `${baseUrl}img/undraw_youtube_tutorial.svg`,
                        imageAlign: 'right',
                        title: 'Join Chat',
                    },
                ]}
            </Block>
        );

        const RichFeature = () => (
            <Block id="rich-feature">
                {[
                    {
                        content:
                            'You can send text, emoticons, pictures, codes and files to others. You can also withdraw the sent message. In addition, you can modify your name and avatar. The most exciting is you can choose or customize different themes',
                        image: `${baseUrl}img/undraw_note_list.svg`,
                        imageAlign: 'left',
                        title: 'Rich Feature',
                    },
                ]}
            </Block>
        );

        const DeployByYourself = () => (
            <Block background="light" id="deploy-by-yourself">
                {[
                    {
                        content:
                            'fiora is an open source project. You can clone the source code and deploy to your own server. It supports windows / Linux and macOS systems. But recommended that you deploy on a linux server',
                        image: `${baseUrl}img/undraw_code_review.svg`,
                        imageAlign: 'right',
                        title: 'Deploy By Yourself',
                    },
                ]}
            </Block>
        );

        const TryItNow = () => {
            return (
                <div className="productShowcaseSection paddingBottom">
                    <h2>Are you very interested?</h2>
                    <div className="more-users">
                        <a className="button" href={siteConfig.url} target="_blank">
                            Try It Now
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
