import React from 'react';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';

const Chat = () => {
    const onClickCopyUrl = () => {
        console.log('클릭');
        ToastsStore.success("URL has been copied")
    }

    return(
        <div className="url_copy">
            <style jsx="true">{`
                .toast {
                    font-size: 16px !important;
                    color: #fff !important;
                    display: inline-block !important;
                    background-color: #000000 !important;
                    box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.16) !important;
                    opacity: 0.7 !important;
                    border-radius: 5px !important;
                    width: 343px !important;
                    line-height: 53px !important;
                    height: 53px !important;
                    margin: 129px 16px auto !important;
                }
            `}</style>
            <button
                type="button"
                className="btn_copy"
                onClick={onClickCopyUrl}>
                    클릭
            </button>
            <ToastsContainer position={ToastsContainerPosition.BOTTOM_CENTER} store={ToastsStore} />
        </div>
    )
}

export default Chat;