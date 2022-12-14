import { useRef, useState, ChangeEvent, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/api/.";
import { Logo } from "@/styles/common";
import { FindInfoWrap, Form, Label, EmailInput, SubmitButton } from "@/styles/pages/auth-style";
import { Main } from "@/components/common/Main";
import { ROUTES } from "@/routes";

const EMAIL_REG = /^[\w-\.]+@([\w-]+\.)+com$/;

const FindID = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const [validation, setValidation] = useState(false);

    const navigate = useNavigate();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (emailRef.current === null) {
            return;
        }

        if (!EMAIL_REG.test(emailRef.current.value)) {
            setValidation(false);
        } else {
            setValidation(true);
        }
    };

    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!validation || emailRef.current === null) {
            return;
        }

        API.post<{ id: string }>(["user", "find", "id"], { email: emailRef.current.value }).then(
            (res: any) => {
                if (res.status !== 200) {
                    return;
                }

                navigate(ROUTES.FindResult.path, {
                    state: { labelName: "아이디", result: res.data.id },
                });
            }
        );
    };

    return (
        <Main>
            <FindInfoWrap>
                <Logo />
                <Form>
                    <Label>이메일</Label>
                    <EmailInput
                        placeholder="이메일을 입력해주세요."
                        ref={emailRef}
                        onChange={onChange}
                        invalid={!validation}
                    />
                    <SubmitButton onClick={onClick}>인증</SubmitButton>
                </Form>
            </FindInfoWrap>
        </Main>
    );
};

export default FindID;
