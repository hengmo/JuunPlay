import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../Loader";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  padding: 100px 50px 50px 50px;
`;

const BackDrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 37%;
  margin-left: 20px;
`;

const ReviewContainer = styled.div`
  width: 100%;
  height: 76%;
  max-height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span`
  font-size: 18px;
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  margin-bottom: 20px;    
  max-height: 22.3vh;
  height: 22.3vh;
`;

const ReviewBox = styled.div`
  width: 92%;
  padding: 0px 10px;
  display: flex;
  flex-direction: column;
  line-height: 32px;
  margin-bottom: 6px;
`;

const ReviewerName = styled.span`
  font-size: 19px;
`;

const ReviewData = styled.span`
  font-size: 15px;
`;

const LikeBox = styled.div``;

const ReviewIcon = styled.button`
  width: 31px;
  font-size: 17px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
`;

const LikeCount = styled.span`
  font-size: 15px;
`;

const EmptyText = styled.span`
  font-size: 23px;
  margin-top: 7vh;
`;

const Iframe = styled.iframe`
  border-radius: 5px;
`;

const ReviewDiv = styled.div`
  margin-left: 10px;
  width: 31%;
`;

const InputContainer = styled.div`
  height: 13vh;
  max-height: 13vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReviewInput = styled.input`
  width: 92%;
  height: 44%;
  font-size: 16px;
  background-color: transparent;
  border: solid black 1px;
  color: white;
  border-radius: 8px;
  outline: none;
`;

const InputBtnContainer = styled.div`
  width: 96%;
  height: 35px;
  display: flex;
  justify-content: flex-end
`;

const InputButton = styled.button`
  background-color: rgba(0, 0, 0, 0.3);
  width: 18%;
  margin-left: 13px;
  border: none;
  border-radius: 5px;
  color: white;
`;

const DetailPresenter = ({
  result,
  loading,
  error,
  showVideos,
  reviews,
  handleLikeReview,
  isLike
}) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      <BackDrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}{" "}
              년
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} 분
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            <Divider>•</Divider>
            <Item>평점 {result.vote_average} / 10.0</Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <Iframe
            id="ytplayer"
            type="text/html"
            width="100%"
            height="54%"
            src={`https://www.youtube.com/embed/${
              showVideos
                ? showVideos.results[0].key
                : result.videos.results[0].key
            }?origin=${result.homepage}&rel=0`}
            frameBorder="0"
            allowFullScreen="allowfullscreen"
          ></Iframe>
        </Data>
        <ReviewDiv>
          <ReviewContainer>
            {reviews && reviews.length > 0 ? (
              reviews.map(review => (
                <ReviewBox key={review.id}>
                  <ReviewerName>{review.writer_name}</ReviewerName>
                  <ReviewData>{review.review_data}</ReviewData>
                  <LikeBox>
                    <ReviewIcon onClick={handleLikeReview}>
                      <i
                        className={
                          isLike ? "fas fa-thumbs-up" : "far fa-thumbs-up"
                        }
                      ></i>
                    </ReviewIcon>
                    <LikeCount>{review.liked_users_id.length}</LikeCount>
                  </LikeBox>
                </ReviewBox>
              ))
            ) : (
              <EmptyText>작성된 리뷰가 없습니다.</EmptyText>
            )}
          </ReviewContainer>
          <InputContainer><ReviewInput placeholder="리뷰를 작성하려면 로그인 해주세요." /></InputContainer>
          <InputBtnContainer>
            <InputButton>취소</InputButton>
            <InputButton>확인</InputButton>
          </InputBtnContainer>
        </ReviewDiv>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default DetailPresenter;
