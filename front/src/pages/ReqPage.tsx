/*lib*/
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
/*data*/
/*styles*/
import {
    GridContainer,
    Container,
    Main,
    Section,
    ButtonContianer,
    Nav,
    NavLink,
    NaviLink,
} from "@/styles/pages/reqpage-style";
/*boards*/
import ReqeustCards from "@/components/RequestCards";
import { Banner } from "@/styles/banner";
import { postsSelector } from "@/recoil/requestPosts";
import { useEffect } from "react";
//pagination
//import Pagination from "@/components/pagination";
import urlCheck from "@/recoil/urlCheck";
//dummies
import post from "@/lib/dummyPosts";
//Modal
import ModalState from "@/recoil/modalState";
import ChallengeRequestModal from "@/modal/ChallengeRequestModal";
import { Pagination } from "@/components/PagiantionNav";
//get data by API
import { AllPostList } from "@/api/postList";

import { PaginationReal } from "@/components/PaginationReal";

const ReqPage = () => {
    const [currentUrl, setCurrentUrl] = useRecoilState(urlCheck);
    const [onModal, setOnModal] = useRecoilState(ModalState);
    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, [currentUrl]);

    // const getPosts = async () => {
    //     const result = await AllPostList();
    //     console.log("result는?", result);
    // };

    // getPosts();

    return (
        <Container>
            <Banner />
            <GridContainer>
                <Main>
                    <Section>
                        <ReqeustCards value={post} />
                        <ButtonContianer>
                            <button onClick={() => setOnModal("challenge")}>글쓰기</button>
                            {onModal == "challenge" && (
                                <ChallengeRequestModal
                                    setOnModal={setOnModal}
                                    addfunction={alert}
                                ></ChallengeRequestModal>
                            )}
                        </ButtonContianer>
                    </Section>
                    <PaginationReal value={post} />
                </Main>
            </GridContainer>
        </Container>
    );
};

export default ReqPage;

//공부중...
// return (
//     <>
//         <div>
//             <h1> currentPage : {page}</h1>
//             <button onClick={handlePageUp}>page up</button>
//             <div>
//                 {posts.map((post) => {
//                     return (
//                         <div key={post.id}>
//                             <h2>{post.title}</h2>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     </>
// );

// const [page, setPage] = useState(0);
//     const posts = useRecoilValue(postsSelector(page));

//     useEffect(() => {
//         console.log("pageATOM : ", page);
//     }, [page]);

//     useEffect(() => {
//         setPage(1);
//     }, []);

//     useEffect(() => {
//         console.log("posts : ", posts);
//     }, [posts]);

//     const handlePageUp = () => {
//         setPage((oldPage) => {
//             return oldPage + 1;
//         });
//     };

/*테스트요 임시로 옮겨둠*


 <Container>
                <Main>
                    <Section>
                        <ReqeustCards />
                        <ReqeustCards />
                        <ReqeustCards />
                        <ReqeustCards />
                        <ReqeustCards />
                        <ButtonContianer>
                            <button>글쓰기</button>
                        </ButtonContianer>
                    </Section>
                    <Nav>
                        <ul>
                            <NavLink to="/reqboard/1">
                                <span>&lt;</span>
                            </NavLink>
                            <NavLink to="/reqboard/1">1</NavLink>
                            <NavLink to="/reqboard/2">2</NavLink>
                            <NavLink to="/reqboard/3">3</NavLink>
                            <NavLink to="/reqboard/4">4</NavLink>
                            <NavLink to="/reqboard/5">5</NavLink>
                            <NavLink to="/reqboard/5">
                                <span>&gt; </span>
                            </NavLink>
                        </ul>
                    </Nav>
                </Main>
            </Container>


            */

//Storage

{
    /* <NavLink to="/reqboard/1">{startNum}</NavLink>
<NavLink to="/reqboard/2">{startNum + 1}</NavLink>
<NavLink to="/reqboard/3">{startNum + 2}</NavLink>
<NavLink to="/reqboard/4">{startNum + 3}</NavLink>
<NavLink to="/reqboard/5">{startNum + 4}</NavLink> */
}
