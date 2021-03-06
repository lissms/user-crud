//REACT// HOOKS
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

//SERVICE/ API
import { updateUser, getUserDetails } from "../../services/user";

//COMPONENTS
import Layout from "../generalComponents/Layout";

//UTILITIES
import dayjs from "dayjs";

//STYLES
import { UpdateContainer, UpdateStyle } from "./Update.styled";

function Update() {
  //translation
  const { t } = useTranslation();

  const [userName, setUserName] = useState("");
  const [userBirthday, setUserBirthday] = useState("");
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(true);

  let myObjetParam = useParams();

  useEffect(() => {
    getUserDetails(myObjetParam.id).then((data) => {
      setUserName(data.name);
      setUserBirthday(data.birthdate);
    });
  }, []);

  const handleFormSubmit = (ev) => {
    ev.preventDefault();
  };

  return (
    <Layout isButtonBackVisible={true}>
      <UpdateContainer>
        <UpdateStyle>
          <h2 className="title">{t("updateTiTle")}</h2>
          <form className="from" onSubmit={handleFormSubmit}>
            <label className="update-name-label" for="Name">
              {t("name")}
            </label>
            <input
              className="update-name"
              onChange={(ev) => {
                setUserName(ev.target.value);
                setDisabled(false);
              }}
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              value={userName}
              required
            />
            <label className="update-birthday-label" for="Name">
              {t("birthdate")}
            </label>
            <input
              className="update-birthday"
              onChange={(ev) => {
                setUserBirthday(ev.target.value);
                setDisabled(false);
              }}
              type="date"
              id="birthday"
              name="birthday"
              value={dayjs(userBirthday).format("YYYY-MM-DD")}
            ></input>
            <input
              className="button-save"
              userName={userName}
              disabled={disabled === true || userName === ""}
              onClick={() => {
                updateUser(myObjetParam.id, userName, userBirthday);
                setMessage("messageUpdate");
              }}
              type="submit"
              value={t("update")}
            />
          </form>
          <p>{t(`${message}`)}</p>
        </UpdateStyle>
      </UpdateContainer>
    </Layout>
  );
}

export default Update;
