import { useState, useRef, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";
import {
    Container,
    Form,
    Input,
    OKButton,
    XButton,
    LogoContainer,
    Label,
    TopImage,
    SecondContainer,
    SecondContainer1,
} from "../styles/pages/userInfo-style";
import { Logo } from "@/styles/common";
import errorRecoil from "@/recoil/errorRecoil";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { changePassword } from "../api/user";
import { userState } from "@/recoil/user";
import sendToast from "@/lib/sendToast";
const ChangePasswordPage = () => {
    // const [userInfo, setUserInfo] = useRecoilState(userInfoData);
    const password = useRef<HTMLInputElement>(null);
    const new_password = useRef<HTMLInputElement>(null);
    const password_hint = useRef<HTMLInputElement>(null);
    const [ValidationCheck, setValidationCheck] = useState(false);
    const setError = useSetRecoilState(errorRecoil);
    const navigate = useNavigate();
    const user = useRecoilValue(userState);

    if (user == null) {
        navigate(ROUTES.ErrorPage.path);
    }
    function isvalidationtrue() {
        if (
            password.current == null ||
            new_password.current == null ||
            password_hint.current == null
        ) {
            return;
        }
        if (
            password.current?.value == "" ||
            new_password.current?.value == "" ||
            password_hint.current?.value == ""
        ) {
            setValidationCheck(false);
            return;
        }
        setValidationCheck(true);
    }
    let formData = {
        password: "",
        new_password: "",
        password_hint: "",
    };
    const validationTrue = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        isvalidationtrue();
    };
    const onClickPrevent = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };
    const onClick = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (password.current?.value != new_password.current?.value) {
            sendToast("??????????????? ?????? ??????????????? ???????????? ????????????.", "error");
        }
        if (
            password.current == null ||
            new_password.current == null ||
            password_hint.current == null
        ) {
            return;
        }

        formData = {
            password: password.current?.value,
            new_password: new_password.current?.value,
            password_hint: password_hint.current?.value,
        };
        const result: any = await changePassword(formData);

        if (result?.response?.status != undefined) {
            setError({
                isError: true,
                message: result?.response?.data?.message,
            });
            return;
        }
        navigate(ROUTES.Home.path);
    };

    return (
        <>
            <TopImage />
            <Container>
                <div>
                    <LogoContainer>
                        <Logo />
                    </LogoContainer>
                    <SecondContainer>
                        <SecondContainer1>
                            <Form>
                                <Label>?????? ????????????</Label>
                                <Input
                                    type="password"
                                    placeholder="??????????????? ???????????????."
                                    name="password"
                                    ref={password}
                                    maxLength={8}
                                />
                                <Label>????????? ????????????</Label>
                                <Input
                                    type="password"
                                    placeholder="??????????????? ???????????????."
                                    name="passwordok"
                                    ref={new_password}
                                    maxLength={8}
                                />
                                <Label>???????????? ??????</Label>
                                <Input
                                    type="text"
                                    placeholder="??????????????? ???????????????."
                                    name="passwordok"
                                    ref={password_hint}
                                    maxLength={8}
                                />

                                {ValidationCheck ? (
                                    <OKButton onClick={onClick} onMouseEnter={validationTrue}>
                                        ????????????
                                    </OKButton>
                                ) : (
                                    <XButton onClick={onClickPrevent} onMouseEnter={validationTrue}>
                                        ????????????
                                    </XButton>
                                )}
                            </Form>
                        </SecondContainer1>
                    </SecondContainer>
                </div>
            </Container>
        </>
    );
};

export default ChangePasswordPage;
