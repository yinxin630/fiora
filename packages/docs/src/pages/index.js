import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

const features = [
    {
        title: 'Richness',
        imageUrl: 'img/website-app.png',
        description: translate({
            message: 'Richness',
        }),
    },
    {
        title: 'Cross Platform',
        imageUrl: 'img/cross-platform.png',
        description: translate({
            message: 'Cross Platform',
        }),
    },
    {
        title: 'Open Source',
        imageUrl: 'img/open-source.png',
        description: translate({
            message: 'Open Source',
        }),
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
            <p className={clsx('text--center', styles.featureDescription)}>{description}</p>
        </div>
    );
}

const descriptions = [
    {
        title: translate({ message: 'Join Chat Title' }),
        content: translate({ message: 'Join Chat Content' }),
        image: `img/undraw_youtube_tutorial.svg`,
        imageAlign: 'right',
    },
    {
        title: translate({ message: 'Rich Feature Title' }),
        content: translate({ message: 'Rich Feature Content' }),
        image: `img/undraw_note_list.svg`,
        imageAlign: 'left',
    },
    {
        title: translate({ message: 'Deploy By Yourself Title' }),
        content: translate({ message: 'Deploy By Yourself Content' }),
        image: `img/undraw_code_review.svg`,
        imageAlign: 'right',
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
            <h2 className={styles.deployTitle}>{translate({ message: 'Interested' })}</h2>
            <div>
                <Link
                    className={clsx(
                        'button button--outline button--secondary button--lg',
                        styles.getStarted,
                    )}
                    to={url}
                >
                    {translate({ message: 'Getting Start' })}
                </Link>
            </div>
        </div>
    );
}

function Home() {
    const context = useDocusaurusContext();
    const { siteConfig = {} } = context;

    const title = translate({ message: 'Title' });
    const tagLine = translate({ message: 'TagLine' });
    const keywords = translate({ message: 'Keywords' });
    const description = translate({ message: 'Description' });

    return (
        <Layout title={tagLine} keywords={keywords} description={description}>
            <header className={clsx('hero hero--primary', styles.heroBanner)}>
                <div className="container">
                    <h1 className="hero__title">{title}</h1>
                    <p className="hero__subtitle">{tagLine}</p>
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
                            {translate({ message: 'Try It Now' })}
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
                        <DeployByYourself url={`${siteConfig.baseUrl}docs/getting-start`} />
                    </div>
                </section>
            </main>
        </Layout>
    );
}

export default Home;
