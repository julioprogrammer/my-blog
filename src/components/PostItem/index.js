import React from 'react'

import * as S from './styled'

const PostItem = () => (
    <S.PostItemLink to="/slug/">
        <S.PostItemWrapper>
            <S.PostItemTag background="#47650b">Misc</S.PostItemTag>
            <S.PostItemInfo>
                <S.PostItemDate>30 de Julho de 2019 • 4 min de leitura</S.PostItemDate>
                <S.PostItemTitle>
                    Diga não ao Medium: tenha sua própria plataforma
                </S.PostItemTitle>
                <S.PostItemDescription>
                    Algumas razōes para você ter sua própria plataforma ao invés de
                    soluçōes como o Medium.
                </S.PostItemDescription>
            </S.PostItemInfo>
        </S.PostItemWrapper>
    </S.PostItemLink>
);

export default PostItem
