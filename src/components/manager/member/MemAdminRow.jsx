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
      <tr id="list" onClick={memberDetail}>
        <td>{member.MEMBER_NO}</td>
        <td>{member.MEMBER_NAME}</td>
        <td>{member.MEMBER_EMAIL}</td>
        <td>{member.MEMBER_DATE}</td>
        <td>{member.SUB}</td>
      </tr>
    </>
  );
};

export default MemAdminRow;
