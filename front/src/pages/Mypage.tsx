import { Banner } from "@/styles/banner";
import { MouseEvent, useRef } from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
//styles
import {
    Container,
    ChallengeContainter,
    MyChallenges,
    LikeChallenges,
    BoardsContainer,
    SideBar,
    MySec,
    MenuContainer,
    Buttons,
    Menu,
    ChallengeIcon,
    UserIcon,
    CategoryContent,
    Input,
    LinkButtons,
} from "@/styles/pages/mypage-style";
import {
    ArtContainer,
    Article,
    Contents,
    Details,
    Box,
    Time,
    DetailContainer,
    DeleteButton,
    LikeButton,
} from "@/styles/common/requestCard-style";
import { CategoryTitle } from "@/styles/pages/home-style";
import { Main } from "@/components/common/Main";
//components
import ChallengeCard, { Level } from "@/components/ChallengeCard";
import PostCards from "@/components/PostCards";
//user's data
import { useRecoilState, useRecoilValue } from "recoil";
import { MyChallengeList } from "@/recoil/ChallengeRecoil";
import { userState } from "@/recoil/user";
//API import
import API from "@/api/.";
import { myInfo } from "@/api/user";
//error handling
import { ROUTES } from "@/routes/.";
//import Modal
import AlertModal from "@/modal/AlertModal";
import BoardEditModal from "@/modal/EditModal";

import dateFormat from "@/lib/dateFormat";
type formData = {
    title: string;
    description: string;
};
const Mypage = () => {
    // const [user, setUser] = useRecoilState(userState);
    const user = useRecoilValue(userState);
    const navigate = useNavigate();
    const [myChallengeList, setMyChallengeList] = useRecoilState(MyChallengeList);
    const [myBoardPostList, setmyBoardPostList] = useState<any>();
    /**
     * Like handling
     */
    const [likesList, setLikesList] = useState(["0"]);
    const [likeData, setLikeData] = useState({});

    //modal handling
    const NO_DELETE_MODAL = 0;
    const [deleteModalOpen, setDeleteModalOpen] = useState(NO_DELETE_MODAL);
    //editing
    const NO_EDIT_MODAL = 0;
    const [editModalOpen, setEditModalOpen] = useState(NO_EDIT_MODAL);

    const [fetchData, setFetchData] = useState<formData | null>(null);
    const [postId, setpostId] = useState(null);

    const [userInfo, setUserInfo] = useState<{
        nickname?: string;
        introduce?: string;
        age?: string;
        region?: string;
        gender?: string;
        profile_image?: string | null;
    } | null>(null);

    //?????? ????????? ?????? ????????????
    useEffect(() => {
        const getAllMyPosts = async () => {
            const result = await API.get(["board", "myPost"]);
            if (result === null) {
                navigate(ROUTES.ErrorPage.path);
                return;
            }
            return result.data;
        };
        getAllMyPosts().then((res: any) => {
            if (res == undefined) {
                navigate(ROUTES.ErrorPage.path);
                return; //to alret
            }
            const postList = [];
            const converting = res.map((post: any) => {
                postList.push(post);
            });
            setmyBoardPostList(postList);
        });
    }, []);

    const getUserInfo = async () => {
        await myInfo().then((res) => {
            if (res === null) {
                return;
            }
            setUserInfo({
                age: res.data.age,
                gender: res.data.gender,
                introduce: res.data.introduce,
                nickname: res.data.nickname,
                profile_image: null,
                region: res.data.region,
            });
        });
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    useEffect(() => {
        API.get(["challenge", "my?start=1&end=5&count=1"]).then((res: any) => {
            return setMyChallengeList(res.data);
        });
    }, []);

    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
        const { name } = e.target as HTMLButtonElement;
        let url = `/${name}`;
        if (name == "changePassword") {
            url = `/Auth`;
            navigate(url, {
                state: {
                    id: name,
                },
            });
        }

        navigate(url, {
            state: {
                id: name,
            },
        });
    };

    //from PostCards, same
    /** API */
    //LIKE
    const puttingLike = async (param: string, data: any) => {
        const result = await API.post<number>(["vote", param], data);
        return result;
    };
    //GET
    const gettingPost = async (params: string) => {
        const result = await API.get(["board", params]);
        return result;
    };
    //DELETE
    const deletingPost = async (param: string) => {
        const result = await API.delete<number>(["board", param]);
        window.location.reload();
        return result;
    };
    //DELETE
    const onClickDelete = (target: number) => {
        deletingPost(target.toString());
    };
    //edit
    const onClickEdit = (target: number, data: any) => {
        gettingPost(target.toString());
    };
    //LIKE
    const onLikeClick = (e: MouseEvent<HTMLButtonElement>) => {
        if (user) {
            //?????? ???????????? id (post_id ???????????? postId??? rename)
            const { name: postId } = e.target as HTMLButtonElement;
            // find post by post_id
            let post;
            for (let page in myBoardPostList) {
                let posts = myBoardPostList[page];
                post = posts.find((postEle) => {
                    return String(postEle.id) === postId;
                });
                if (post !== undefined) break;
            }
            //put data
            puttingLike(postId, "");
            //post_id??? likeData??? ????????? true??? false??? ????????? ????????? true??? ?????????
            if (likeData.hasOwnProperty(postId)) {
                likeData[postId] = !likeData[postId];
            } else {
                likeData[postId] = true;
            }
            //?????? ????????? 1??? / ????????? 0??? ?????????.
            let totalLikes = post._count.VotePost + (likeData[postId] ? 1 : 0);
            //HTML??? ????????? innerHTML??? ?????? ?????????
            (e.target as HTMLButtonElement).innerHTML = totalLikes;
        }
    };
    const onClickGetData = (target: number) => {
        gettingPost(target.toString()).then((res) => {
            const data: any = res.data;
            let formData: formData = {
                title: "",
                description: "",
            };
            formData.title = data.title;
            formData.description = data.description;
            setFetchData(formData);
        });
    };

    /** Style */
    //DATE formatting
    const formatDate = (createdAt: string) => {
        const dt = new Date(createdAt);
        return `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()} ${
            dt.getHours() < 12 ? "??????" : "??????"
        } ${String(dt.getHours() % 12).padStart(2, "0")}:${String(dt.getMinutes()).padStart(
            2,
            "0"
        )}`;
    };

    return (
        <Main>
            <Container>
                <SideBar>
                    <MySec>
                        <div>
                            <p style={{ fontSize: "20px" }}>{userInfo?.nickname}</p>
                        </div>
                        <div>
                            <p style={{ fontSize: "16px" }}>{userInfo?.introduce}</p>
                        </div>
                    </MySec>
                    <MenuContainer>
                        <Menu>
                            <span>???????????????</span>
                            <Buttons name="MyChallengeList" onClick={onClick}>
                                <ChallengeIcon />
                                ????????? ?????????
                            </Buttons>
                            <LinkButtons to={"/myposts"}>
                                <ChallengeIcon />??? ?????????
                            </LinkButtons>
                        </Menu>
                        <Menu>
                            <span>????????????</span>
                            <Buttons name="Auth" onClick={onClick}>
                                <UserIcon />
                                ???????????? ??????
                            </Buttons>
                            <Buttons name="changePassword" onClick={onClick}>
                                <UserIcon />
                                ???????????? ??????
                            </Buttons>
                            <Buttons
                                name="withdrawal"
                                onClick={() =>
                                    navigate("/Auth", {
                                        state: {
                                            id: "withdrawal",
                                        },
                                    })
                                }
                            >
                                <UserIcon />
                                ???????????? ??????
                            </Buttons>
                        </Menu>
                    </MenuContainer>
                </SideBar>
                <ChallengeContainter>
                    <MyChallenges>
                        <CategoryTitle>
                            ?????? ????????? ?????????
                            <Link
                                to="/challengelist/my"
                                state={"authuser"}
                                style={{ fontSize: "16px", color: "#a5a5a5", paddingLeft: "20px" }}
                            >
                                ????????? &gt;
                            </Link>
                        </CategoryTitle>
                        <CategoryContent>
                            {Object.values(myChallengeList)
                                .slice(0, 3)
                                .map((comment, idx) => (
                                    <ChallengeCard
                                        key={idx}
                                        id={comment[0].id}
                                        level={comment[0].level as Level}
                                        //   grade={true}
                                        title={comment[0].title}
                                        date={dateFormat(
                                            comment[0].start_date,
                                            comment[0].due_date
                                        )}
                                        count={comment[0]._count.Challenger}
                                        // mode={darkMode ?? "Light"}
                                    />
                                ))}
                        </CategoryContent>
                    </MyChallenges>
                    <LikeChallenges>
                        <CategoryTitle>?????? ????????? ????????? ??????</CategoryTitle>
                        {myBoardPostList && (
                            <BoardsContainer>
                                {myBoardPostList.map((post, idx) => {
                                    return (
                                        <Article key={idx}>
                                            <ArtContainer>
                                                <Contents>
                                                    <h3>{post.title}</h3>
                                                    <p>{post.description}</p>
                                                </Contents>
                                                <Box>
                                                    <LikeButton
                                                        name={post.id}
                                                        onClick={onLikeClick}
                                                    >
                                                        {post._count.VotePost +
                                                            (likeData.hasOwnProperty(post.id) &&
                                                            likeData[post.id]
                                                                ? 1
                                                                : 0)}
                                                    </LikeButton>
                                                </Box>
                                            </ArtContainer>
                                            <DetailContainer>
                                                <Details>
                                                    <li>
                                                        <span>?????????</span>
                                                        <span>{post.author}</span>
                                                    </li>
                                                    <li>
                                                        <Time>{formatDate(post.createdAt)}</Time>
                                                    </li>
                                                    {user?.nickname === post.author ? (
                                                        <>
                                                            <DeleteButton
                                                                name={`${post.id}`}
                                                                onClick={() => {
                                                                    setDeleteModalOpen(post.id);
                                                                }}
                                                            >
                                                                ??????
                                                            </DeleteButton>
                                                            <DeleteButton
                                                                name={`${post.id}`}
                                                                onClick={() => {
                                                                    setEditModalOpen(post.id);
                                                                    onClickGetData(post.id);
                                                                    setpostId(post.id);
                                                                }}
                                                            >
                                                                ??????
                                                            </DeleteButton>
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </Details>
                                            </DetailContainer>
                                        </Article>
                                    );
                                })}
                                <AlertModal
                                    modalOpen={deleteModalOpen}
                                    trigger={onClickDelete}
                                    closeModal={() => setDeleteModalOpen(0)}
                                ></AlertModal>
                                {fetchData && (
                                    <BoardEditModal
                                        modalOpen={editModalOpen}
                                        trigger={onClickEdit}
                                        closeModal={() => setEditModalOpen(0)}
                                        fetchData={fetchData}
                                        postId={postId}
                                        setpostId={setpostId}
                                    ></BoardEditModal>
                                )}
                            </BoardsContainer>
                        )}
                    </LikeChallenges>
                </ChallengeContainter>
            </Container>
        </Main>
    );
};

export default Mypage;
