import React from "react";
import { useNavigate } from "react-router-dom";
import { memberList } from "../../../service/dbLogic";

const MemAdminRow = ({ isLogin, isAdmin, member }) => {
  let navigate = useNavigate();
  const memberDetail = () => {
    memberList({ member_no: member.MEMBER_NO }).then((res) => {
      console.log(res.data);
      navigate("/admin/member/" + member.MEMBER_NO);
    });
  };
  return (
    <>
      <tr onClick={memberDetail}>
        <td colSpan={10} className="bdr bdt">
          <span style={{ marginRight: "15%" }}>{member.MEMBER_NO}</span>
          <span style={{ marginRight: "10%" }}>{member.MEMBER_NAME}</span>
          <span style={{ marginRight: "10%" }}>{member.MEMBER_EMAIL}</span>
          <span style={{ marginRight: "12%" }}>{member.MEMBER_DATE}</span>
          <span style={{ marginRight: "15%" }}>{member.MEMBER_LEVEL}</span>
          <span>{member.SUB}</span>
        </td>
      </tr>
    </>
  );
};

export default MemAdminRow;
