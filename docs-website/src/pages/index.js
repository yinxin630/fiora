import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
    {
        title: 'Richness',
        imageUrl: 'img/website-app.png',
        description: (
            <>
                fiora contains backend, frontend
                <br />
                Android and iOS apps
            </>
        ),
    },
    {
        title: 'Cross Platform',
        imageUrl: 'img/cross-platform.png',
        description: (
            <>
                fiora is developed with node.js
                <br />
                Supports Windows / Linux / macOS systems
            </>
        ),
    },
    {
        title: 'Open Source',
        imageUrl: 'img/open-source.png',
        description: <>fiora follows the MIT open source license'</>,
    },
];

function Feature({ imageUrl, title, description }) {
    const imgUrl = useBaseUrl(imageUrl);
    return (
        <div className={clsx('col col--4', styles.feature)}>
            {imgUrl && (
                <div className="text--center">
                    <img className={styles.featureImage} src={imgUrl} alt={title} />
                </div>
            )}
            <h3 className="text--center">{title}</h3>
            <p className="text--center">{description}</p>
        </div>
    );
}

const descriptions = [
    {
        content:
            'Register an account to join the chat. Join or create new group. Chat privately with funny strangers and add them as friends. Your account and messages will be stored forever',
        image: `img/undraw_youtube_tutorial.svg`,
        imageAlign: 'right',
        title: 'Join Chat',
    },
    {
        content:
            'You can send text, emoticons, pictures, codes and files to others. You can also withdraw the sent message. In addition, you can modify your name and avatar. The most exciting is you can choose or customize different themes',
        image: `img/undraw_note_list.svg`,
        imageAlign: 'left',
        title: 'Rich Feature',
    },
    {
        content:
            'fiora is an open source project. You can clone the source code and deploy to your own server. It supports windows / Linux and macOS systems. But recommended that you deploy on a linux server',
        image: `img/undraw_code_review.svg`,
        imageAlign: 'right',
        title: 'Deploy By Yourself',
    },
];

function Description({ title, content, image, index }) {
    return (
        <div className={clsx(styles.description, index % 2 === 0 && styles.lightBackground)}>
            <div className={clsx(styles.descriptionContent, index % 2 === 1 && styles.rightImage)}>
                <div className={clsx('col col--6', 'text--center')}>
                    <img className={styles.descriptionImage} src={image} alt={title} />
                </div>
                <div className={clsx('col col--6')}>
                    <h3 className="text--center">{title}</h3>
                    <p className="text--center">{content}</p>
                </div>
            </div>
        </div>
    );
}

function DeployByYourself({ url }) {
    return (
        <div className={styles.deployByYourself}>
            <h2 className={styles.deployTitle}>Are you very interested?</h2>
            <div>
                <Link
                    className={clsx(
                        'button button--outline button--secondary button--lg',
                        styles.getStarted,
                    )}
                    to={url}
                >
                    Getting Start
                </Link>
            </div>
        </div>
    );
}

function Home() {
    const context = useDocusaurusContext();
    const { siteConfig = {} } = context;

    return (
        <Layout
            title={`${siteConfig.title} · ${siteConfig.tagline}`}
            description="docs for fiora project"
        >
            <header className={clsx('hero hero--primary', styles.heroBanner)}>
                <div className="container">
                    <h1 className="hero__title">{siteConfig.title}</h1>
                    <p className="hero__subtitle">{siteConfig.tagline}</p>
                    <div>
                        <iframe
                            className={styles.starIframe}
                            src="https://ghbtns.com/github-btn.html?user=yinxin630&repo=fiora&type=star&count=true&size=large"
                            width={160}
                            height={30}
                            title="GitHub Stars"
                        />
                    </div>
                    <div className={styles.buttons}>
                        <Link
                            className={clsx(
                                'button button--outline button--secondary button--lg',
                                styles.getStarted,
                            )}
                            to={siteConfig.url}
                        >
                            Try It Now
                        </Link>
                    </div>
                </div>
            </header>
            <main>
                {features && features.length > 0 && (
                    <section className={styles.features}>
                        <div className="container">
                            <div className="row">
                                {features.map((props, idx) => (
                                    <Feature key={idx} {...props} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
                {descriptions && descriptions.length > 0 && (
                    <section className={styles.descriptions}>
                        <div className={clsx('row', styles.descriptionRow)}>
                            {descriptions.map((props, idx) => (
                                <Description key={idx} {...props} index={idx} />
                            ))}
                        </div>
                    </section>
                )}
                <section className={styles.descriptions}>
                    <div className={clsx('row', styles.descriptionRow)}>
                        <DeployByYourself url={siteConfig.url} />
                    </div>
                </section>
            </main>
        </Layout>
    );
}

export default Home;
