import React from "react"
import PropTypes from "prop-types"
import ReactDisqusComments from "react-disqus-comments"

import * as S from "./styled"

const Comments = ({ url, title }) => {
    const completeURL = `https://julioccolv.com.br${url}`

    return (
        <S.CommentsWrapper>
            <S.CommentsTitle>Comentários</S.CommentsTitle>
            <ReactDisqusComments
                shortname="juliocesarcaitanooliveira"
                identifier={completeURL}
                title={title}
                url={completeURL}
            />
        </S.CommentsWrapper>
    )
}

Comments.propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

export default Comments