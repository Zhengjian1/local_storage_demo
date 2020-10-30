import React, { useEffect, useState } from 'react';
import { Popover, Button } from "antd"
import QRCode from "qrcode.react"
import "./index.css"
import BScroll from '@better-scroll/core'
import NestedScroll from '@better-scroll/nested-scroll'
import { IsPC } from "@utils"

BScroll.use(NestedScroll)

const isPc = IsPC(); 

const _data1 = [
    '😀 😁 😂 🤣 😃 🙃 ',
    '👆🏻 outer scroll 👇🏻 ',
    '🙂 🤔 😄 🤨 😐 🙃 ',
    '👆🏻 outer scroll 👇🏻 ',
    '😔 😕 🙃 🤑 😲 ☹️ ',
    '🙂 🤔 😄 🤨  😐 🙃 ',
    '👆🏻 outer scroll 👇🏻 ',
    '😔 😕 🙃 🤑 😲 ☹️ '
]

const _data2 = [
    'The Mountain top of Inner',
    '😀 😁 😂 🤣 😃 🙃 ',
    '👆🏻 inner scroll 👇🏻 ',
    '🙂 🤔 😄 🤨 😐 🙃 ',
    '👆🏻 inner scroll 👇🏻 ',
    '😔 😕 🙃 🤑 😲 ☹️ ',
    '👆🏻 inner scroll 👇🏻 ',
    '🐣 🐣 🐣 🐣 🐣 🐣 ',
    '👆🏻 inner scroll 👇🏻 ',
    '🐥 🐥 🐥 🐥 🐥 🐥 ',
    '👆🏻 inner scroll 👇🏻 ',
    '🤓 🤓 🤓 🤓 🤓 🤓 ',
    '👆🏻 inner scroll 👇🏻 ',
    '🦔 🦔 🦔 🦔 🦔 🦔 ',
    '👆🏻 inner scroll 👇🏻 ',
    '🙈 🙈 🙈 🙈 🙈 🙈 ',
    '👆🏻 inner scroll 👇🏻 ',
    '🚖 🚖 🚖 🚖 🚖 🚖 ',
    '👆🏻 inner scroll 👇🏻 ',
    '✌🏻 ✌🏻 ✌🏻 ✌🏻 ✌🏻 ✌🏻 ',
    'The Mountain foot of Inner',
]

function renderData(data) {
    return data.map((item, index) => (
        <li className="outer-list-item" key={item + index}>{item}</li>
    ))
}


function Index() {
    const [toScreenBottomHeight, setToScreenBottomHeight] = useState(0)
    function initBscroll() {
        // outer
        new BScroll(".outerScroll", {
            nestedScroll: true,
        })
        // inner
        new BScroll(".innerScroll", {
            nestedScroll: true,
            // close bounce effects
            bounce: {
                top: false,
                bottom: false
            }
        })
    }

    useEffect(() => {
        const screenH = document.body.clientHeight;
        const innerWrapDom = document.querySelector(".inner-wrapper");
        setToScreenBottomHeight(screenH - innerWrapDom.offsetTop - 100);

    }, [])

    useEffect(() => {
        initBscroll();
    }, [])

    function popoverContent() {
        const value = window.location.href
        return <QRCode value={value} />
    }

    function popoverRender() {
        if (isPc) {
            return (
                <div className="popover">
                    <Popover content={popoverContent()} title="手机扫码预览" trigger="hover" >
                        <Button>二维码预览</Button>
                    </Popover>
                </div>
            )
        }

    }

    return (
        <div className={isPc ? "demo-component-wrap" : "demo-component-wrap-app"}>
            {popoverRender()}
            <div className="container">
                <div className="outer-wrapper outerScroll">
                    <div className="outer-content">
                        <ul>{renderData(_data1)}</ul>
                        <div className="inner-wrapper innerScroll"
                            style={{
                                // height: `${toScreenBottomHeight}px`,
                                height: `200px`
                            }}>
                            <ul className="inner-content">{renderData(_data2)}</ul>
                        </div>
                        <ul>{renderData(_data1)}</ul>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Index;
