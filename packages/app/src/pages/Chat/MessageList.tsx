import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Keyboard, Modal, Image } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

import action from '../../state/action';
import fetch from '../../utils/fetch';

import Message from './Message';
import {
    useFocusLinkman,
    useIsLogin,
    useSelfId,
    useStore,
} from '../../hooks/useStore';
import { Message as MessageType } from '../../types/redux';
import Toast from '../../components/Toast';
import { isAndroid, isiOS } from '../../utils/platform';
import { referer } from '../../utils/constant';

type Props = {
    $scrollView: React.MutableRefObject<ScrollView>;
};

let prevContentHeight = 0;
let prevMessageCount = 0;
let shouldScroll = true;
let isFirstTimeFetchHistory = true;

function MessageList({ $scrollView }: Props) {
    const isLogin = useIsLogin();
    const self = useSelfId();
    const focusLinkman = useFocusLinkman();
    const { focus } = useStore();
    const messages = focusLinkman?.messages || [];

    const [refreshing, setRefreshing] = useState(false);
    const [showImageViewerDialog, toggleShowImageViewerDialog] = useState(
        false,
    );
    const [imageViewerIndex, setImageViewerIndex] = useState(0);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardWillShow',
            handleKeyboardShow,
        );

        return () => {
            prevContentHeight = 0;
            prevMessageCount = 0;
            shouldScroll = true;
            isFirstTimeFetchHistory = true;
            keyboardDidShowListener.remove();
        };
    }, []);

    function getImages() {
        const imageMessages = messages.filter(
            (message) => message.type === 'image',
        );
        const images = imageMessages.map((message) => {
            const url = message.content;
            const parseResult = /width=(\d+)&height=(\d+)/.exec(url);
            return {
                url: `${url.startsWith('//') ? 'https:' : ''}${url}`,
                ...(parseResult
                    ? {
                        width: +parseResult[1],
                        height: +parseResult[2],
                    }
                    : {}),
            };
        });
        return images;
    }

    function scrollToEnd(time = 0) {
        if (time > 200) {
            return;
        }
        if ($scrollView.current) {
            $scrollView.current!.scrollToEnd({ animated: false });
        }

        setTimeout(() => {
            scrollToEnd(time + 50);
        }, 50);
    }

    function handleKeyboardShow() {
        scrollToEnd();
    }

    async function handleRefresh() {
        if (refreshing) {
            return;
        }

        if (isFirstTimeFetchHistory && isAndroid) {
            isFirstTimeFetchHistory = false;
            return;
        }

        setRefreshing(true);

        let err = null;
        let result = null;
        if (isLogin) {
            [err, result] = await fetch('getLinkmanHistoryMessages', {
                linkmanId: focus,
                existCount: messages.length,
            });
        } else {
            [err, result] = await fetch('getDefalutGroupHistoryMessages', {
                existCount: messages.length,
            });
        }
        if (!err) {
            if (result.length > 0) {
                action.addLinkmanHistoryMessages(focus, result);
            } else {
                Toast.warning('没有更多消息了');
            }
        }

        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }
    /**
     * 加载历史消息后, 自动滚动到合适位置
     */
    function handleContentSizeChange(
        contentWidth: number,
        contentHeight: number,
    ) {
        if (prevContentHeight === 0) {
            $scrollView.current!.scrollTo({
                x: 0,
                y: 0,
                animated: false,
            });
        } else if (
            contentHeight !== prevContentHeight &&
            messages.length - prevMessageCount > 1
        ) {
            $scrollView.current!.scrollTo({
                x: 0,
                y: contentHeight - prevContentHeight - 60,
                animated: false,
            });
        }
        prevContentHeight = contentHeight;
        prevMessageCount = messages.length;
    }

    function handleScroll(event: any) {
        const {
            layoutMeasurement,
            contentSize,
            contentOffset,
        } = event.nativeEvent;
        shouldScroll =
            contentOffset.y >
            contentSize.height - layoutMeasurement.height * 1.2;

        if (contentOffset.y < (isiOS ? 0 : 50)) {
            handleRefresh();
        }
    }

    function openImageViewer(url: string) {
        const images = getImages();
        const index = images.findIndex(
            (image) => image.url.indexOf(url) !== -1,
        );
        toggleShowImageViewerDialog(true);
        setImageViewerIndex(index);
    }

    function renderMessage(message: MessageType) {
        return (
            <Message
                key={message._id}
                message={message}
                isSelf={self === message.from._id}
                shouldScroll={shouldScroll}
                scrollToEnd={scrollToEnd}
                openImageViewer={openImageViewer}
            />
        );
    }

    function closeImageViewerDialog() {
        toggleShowImageViewerDialog(false);
    }

    return (
        <ScrollView
            style={styles.container}
            ref={$scrollView}
            onContentSizeChange={handleContentSizeChange}
            scrollEventThrottle={50}
            onScroll={handleScroll}
        >
            {messages.map((message) => renderMessage(message))}
            <Modal
                visible={showImageViewerDialog}
                transparent
                onRequestClose={closeImageViewerDialog}
            >
                <ImageViewer
                    imageUrls={getImages()}
                    index={imageViewerIndex}
                    onClick={closeImageViewerDialog}
                    onSwipeDown={closeImageViewerDialog}
                    saveToLocalByLongPress={false}
                    renderImage={(image) => (
                        <Image
                            source={{
                                uri: image.source.uri,
                                cache: 'force-cache',
                                headers: {
                                    Referer: referer,
                                },
                            }}
                            style={image.style}
                        />
                    )}
                />
            </Modal>
        </ScrollView>
    );
}

export default MessageList;

const styles = StyleSheet.create({
    container: {
        paddingTop: 8,
        paddingBottom: 8,
    },
});
