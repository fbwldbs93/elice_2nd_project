import { useState, useRef, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";
import {
    Form,
    Input,
    OKButton,
    XButton,
    Label,
    SecondContainer,
    SecondContainer1,
    Select,
} from "../styles/pages/signup-style";
import { signup } from "@/api/user";
import { User } from "@/types/user";
import sendToast from "@/lib/sendToast";
import { userState } from "@/recoil/user";
import { useSetRecoilState } from "recoil";
import useLogin from "@/hooks/useLogin";
const SignUpForm = () => {
    const nickname = useRef<HTMLInputElement>(null);
    const introduce = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const passwordok = useRef<HTMLInputElement>(null);
    const id = useRef<HTMLInputElement>(null);
    const region = useRef<HTMLSelectElement>(null);
    const age = useRef<HTMLSelectElement>(null);
    const gender = useRef<HTMLInputElement>(null);
    const [ValidationCheck, setValidationCheck] = useState(false);
    const [inputStatus, setInputStatus] = useState("");
    const setLogin = useLogin("/");
    const setUser = useSetRecoilState(userState);

    const navigate = useNavigate();

    const handleClickRadioButton = (radioBtnName: string) => {
        setInputStatus(radioBtnName);
    };
    function isvalidationtrue() {
        if (
            email.current == null ||
            introduce.current == null ||
            password.current == null ||
            passwordok.current == null ||
            id.current == null ||
            nickname.current == null ||
            gender.current == null ||
            age.current == null ||
            region.current == null
        ) {
            return;
        }
        if (
            email.current?.value == "" ||
            introduce.current?.value == "" ||
            password.current?.value == "" ||
            passwordok.current?.value == "" ||
            id.current?.value == "" ||
            nickname.current?.value == "" ||
            inputStatus == "" ||
            age.current?.value == "" ||
            region.current?.value == "" ||
            region.current?.value == "????????????"
        ) {
            setValidationCheck(false);
            return;
        }
        if (password.current?.value != passwordok.current?.value) {
            sendToast("??????????????? ?????? ??????????????? ???????????? ????????????.", "error");
        }
        setValidationCheck(true);
    }
    let formData = {
        email: "",
        introduce: "",
        nickname: "",
        password: "",
        id: "",
        age: "",
        region: "",
        gender: "",
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

        if (
            email.current == null ||
            introduce.current == null ||
            password.current == null ||
            passwordok.current == null ||
            id.current == null ||
            nickname.current == null ||
            gender.current == null ||
            age.current == null ||
            region.current == null
        ) {
            return;
        }

        formData = {
            email: email.current?.value,
            introduce: introduce.current?.value,
            password: password.current?.value,
            id: id.current?.value,
            nickname: nickname.current?.value,
            gender: inputStatus,
            age: age.current?.value,
            region: region.current?.value,
        };

        const result: any = await signup(formData);

        if (result?.response?.status != undefined) {
            sendToast(result?.response?.data?.message, "error");
            return;
        }

        const user: User = {
            nickname: nickname.current?.value,
            introduce: introduce.current?.value,
            admin: false,
        };

        setUser(user);
        navigate(ROUTES.Home.path);
    };

    function selectnum() {
        var num = [];
        for (let i = 20; i <= 60; i += 10) {
            num.push(<option value={i + "???"}>{i}???</option>);
        }
        return num;
    }
    return (
        <SecondContainer>
            <SecondContainer1>
                <Form>
                    <Label>?????????</Label>
                    <Input placeholder="?????????" name="passwordhint" ref={id} />

                    <Label>?????????</Label>
                    <Input
                        type="email"
                        placeholder="???????????? ???????????????."
                        name="email"
                        ref={email}
                    />
                    <Label>?????????</Label>
                    <Input
                        type="id"
                        placeholder="???????????? ???????????????."
                        name="nickname"
                        ref={nickname}
                    />
                    <Label>?????????</Label>
                    <Input placeholder="???????????? ???????????????." name="introduce" ref={introduce} />
                    <Label>??????</Label>
                    <div>
                        <span>
                            <input
                                name="gender"
                                type="radio"
                                value="???"
                                defaultChecked={inputStatus === "???"}
                                onClick={() => handleClickRadioButton("???")}
                                ref={gender}
                            ></input>
                            <label style={{ marginRight: "40px" }}>???</label>
                            <input
                                name="gender"
                                type="radio"
                                value="???"
                                defaultChecked={inputStatus === "???"}
                                onClick={() => handleClickRadioButton("???")}
                                ref={gender}
                            ></input>
                            ???
                        </span>
                    </div>
                </Form>
            </SecondContainer1>
            <SecondContainer1>
                <Form>
                    <Label>????????????</Label>
                    <Input
                        type="password"
                        placeholder="??????????????? ???????????????."
                        name="password"
                        ref={password}
                        maxLength={8}
                    />
                    <Label>???????????? ??????</Label>
                    <Input
                        type="password"
                        placeholder="??????????????? ???????????????."
                        name="passwordok"
                        ref={passwordok}
                        maxLength={8}
                    />
                    <Label>??????</Label>
                    <Select defaultValue="1" ref={age} name="age">
                        {selectnum()}
                    </Select>
                    <Label>??????</Label>
                    <Select defaultValue="????????????" name="local" ref={region}>
                        <option value="????????????">????????????</option>
                        <option value="??????">??????</option>
                        <option value="?????????">?????????</option>
                        <option value="?????????">?????????</option>
                        <option value="?????????">?????????</option>
                        <option value="?????????">?????????</option>
                        <option value="?????????">?????????</option>
                    </Select>
                    {ValidationCheck ? (
                        <OKButton onClick={onClick} onMouseEnter={validationTrue}>
                            ?????? ????????????
                        </OKButton>
                    ) : (
                        <XButton onClick={onClickPrevent} onMouseEnter={validationTrue}>
                            ?????? ????????????
                        </XButton>
                    )}
                </Form>
            </SecondContainer1>
        </SecondContainer>
    );
};

export default SignUpForm;
