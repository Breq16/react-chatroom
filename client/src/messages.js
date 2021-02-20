import React from 'react'
import Twemoji from 'twemoji'

function Message(props) {
    const li_style = {
        listStyleType: "none",
        marginBottom: "10px"
    }

    const author_style = {
        border: "1px solid #000",
        marginRight: "10px",
        display: "inline-block",
        padding: "0 5px",
        textAlign: "center",
        fontWeight: "bold",
        backgroundColor: props.message.color
    }

    let content = props.message.content
    content = Twemoji.parse(content)

    return (
        <li style={li_style}>
            <span style={author_style}>
                {props.message.nickname}
            </span>
            <span dangerouslySetInnerHTML={{__html: content}}></span>
        </li>
    )
}

export default class Messages extends React.Component {
    constructor(props) {
        super(props)
        this.messagesEnd = React.createRef()
    }

    render() {
        const style = {
            flexGrow: 1,
            minHeight: 0,
            fontFamily: "Lato",
            padding: "10px",
            fontSize: 16,
            overflowY: "scroll",
        }

        let messages = []
        for (let index in this.props.messages) {
            messages.push(
                <Message message={this.props.messages[index]} key={index} />
            )
        }
        return (
            <ul style={style}>
                {messages}
                <div ref={this.messagesEnd}></div>
            </ul>
        )
    }

    componentDidUpdate(prevProps, prevState, snapsnot) {
        this.messagesEnd.current.scrollIntoView({behavior: "smooth"})
    }
}
