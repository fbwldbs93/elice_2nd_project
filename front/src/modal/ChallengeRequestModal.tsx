import {
    ModalContainer,
    ModalBody,
    LongInput,
    FlexBox,
    GrayButton,
    GreenButton,
    Label,
    Input,
    NonFlexBox,
    AllCenterBox,
    TitleBOx,
    Select,
} from "@/styles/challengeRequestModal-style";
import { useRef } from "react";
import ModalPortal from "./ModalPortal";
import Draggable from "react-draggable";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import ReactDatePicker from "@/components/ReactDatePicker";
import * as _ from "lodash";
import { challengeResult } from "@/types/challengeTypes";
import API from "@/api/index";
import { min } from "lodash";

type Props = {
    setOnModal: (state: string) => void;
    addfunction: (state: void) => void;
};
const DragContainer: any = Draggable;
const ChallengeRequestModal: React.FC<Props> = ({ setOnModal, addfunction }: Props) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const title = useRef<HTMLInputElement>(null);
    const description = useRef<HTMLInputElement>(null);
    const goal = useRef<HTMLInputElement>(null);
    const level = useRef<HTMLInputElement>(null);
    // const level = useRef<HTMLInputElement>(null);

    let formData = {
        title: "",
        description: "",
        goal: "",
        start_date: "",
        due_date: "",
        level: "",
    };
    const buttonClick = async () => {
        if (
            title.current == null ||
            description.current == null ||
            goal.current == null ||
            level.current.value == null
        ) {
            return;
        }
        formData = {
            title: title.current?.value,
            description: description.current?.value,
            goal: goal.current?.value,
            start_date: startDate.toDateString(),
            due_date: endDate.toDateString(),
            level: level.current.value,
        };

        await API.post<challengeResult>(["challenge"], formData);
    };

    return (
        <ModalPortal>
            <ModalContainer>
                <DragContainer>
                    <ModalBody>
                        <div>
                            <TitleBOx>
                                <div>????????? ????????? ????????????</div>
                                <button className="close" onClick={() => setOnModal("false")}>
                                    ???
                                </button>
                            </TitleBOx>
                            <NonFlexBox style={{ marginTop: "60px" }}>
                                <Label>????????? ??????</Label>
                                <Input ref={title} placeholder="????????? ????????? ???????????????." />
                                <div style={{ display: "flex", width: "100%" }}>
                                    <Label>??????</Label>
                                    <Label>?????????</Label>
                                </div>
                                <FlexBox>
                                    <AllCenterBox>
                                        <FlexBox>
                                            <ReactDatePicker
                                                setStart={setStartDate}
                                                setEnd={setEndDate}
                                            />
                                        </FlexBox>
                                    </AllCenterBox>
                                    <Input
                                        ref={goal}
                                        style={{ width: "50%", marginLeft: "20px" }}
                                        placeholder="???????????? ???????????????."
                                    />
                                </FlexBox>
                                <div style={{ display: "flex", width: "100%" }}>
                                    <Label style={{ marginBottom: "20px" }}>??????</Label>
                                </div>
                                <Select name="local" ref={level}>
                                    <option value="beginner">beginner</option>
                                    <option value="intermediate">intermediate</option>
                                    <option value="advanced">advanced</option>
                                    <option value="default">default</option>
                                </Select>

                                <div>
                                    <Label>??????</Label>
                                </div>
                                <LongInput
                                    ref={description}
                                    placeholder="????????? ????????? ???????????????."
                                />
                                <div style={{ marginBottom: "30px" }}>
                                    ???????????? ???????????? ?????? ?????? ???, ????????? ?????? ????????? ?????? ?????????
                                    ??? ????????????
                                </div>
                            </NonFlexBox>

                            <FlexBox style={{ justifyContent: "center" }}>
                                <GrayButton
                                    className="close"
                                    onClick={() => {
                                        setOnModal("false");
                                    }}
                                >
                                    ????????????
                                </GrayButton>

                                <GreenButton
                                    className="close"
                                    onClick={() => {
                                        buttonClick();
                                        setOnModal("false");
                                    }}
                                >
                                    ????????? ????????????
                                </GreenButton>
                            </FlexBox>
                        </div>
                    </ModalBody>
                </DragContainer>
            </ModalContainer>
        </ModalPortal>
    );
};

export default ChallengeRequestModal;
