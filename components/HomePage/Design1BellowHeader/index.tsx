import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useAppDispatch, useAppSelector } from "app/hooks";
// import { isMobile } from "react-device-detect";
import {
  fetchBalanceDetailsAction,
  selectAccount,
  selectBalanceDetails,
} from "app/reducers/AccountSlice";
import {
  convertToDecimal,
  shortenString,
} from "utils/reUseAbleFunctions/reuseAbleFunctions";
const BellowHeader1 = styled.div`
  width: 100%;
  margin-top: 30px;
  word-break: break-all;
  .wrapwidth {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    @media (max-width: 768px) {
      display: block;
    }
    .leftSec {
      position: relative;
      h1 {
        position: relative;
      }
      p {
        width: fit-content;
        background-color: rgba(241, 233, 231, 1);
        padding: 8px 20px;
        border-radius: 15px;
        svg {
          font-size: 15px;
        }
      }
    }
    .rightSec {
      background-color: rgba(58, 52, 51, 0.05);
      padding: 10px 20px 20px 20px;
      width: 300px;
      border-radius: 15px;
      @media (max-width: 768px) {
        width: 100%;
      }
      h4 {
        position: relative;
      }
      p {
        position: relative;
        padding-bottom: 0;
        margin-bottom: 0;
        line-height: normal;
        margin-block-start: 0;
        margin-block-end: 0;
        padding-top: 0;
        svg {
          font-size: 16px;
        }
      }
    }
  }
`;

interface Props {}

const Design1BellowHeader: React.FC<Props> = () => {
  const [isMobile, setIsMobile] = useState(false);
  const balance = useAppSelector(selectBalanceDetails) as any;
  const userAccount = useAppSelector(selectAccount);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBalanceDetailsAction(userAccount?.address));
  }, [dispatch, userAccount]);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      <BellowHeader1>
        <div className="wrapwidth">
          <div className="leftSec">
            <h1>Account</h1>
            {isMobile ? (
              <p>
                {shortenString(userAccount?.address)}

                <ContentCopyIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigator.clipboard.writeText(userAccount?.address);
                  }}
                />
              </p>
            ) : (
              <p>
                {userAccount?.address}

                <ContentCopyIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigator.clipboard.writeText(userAccount?.address);
                  }}
                />
              </p>
            )}
          </div>
          <div className="rightSec">
            {balance?.data ? (
              <h3>{balance?.data?.coin?.value / 10 ** 8} APT</h3>
            ) : (
              ""
            )}
            <p>
              Balance <InfoOutlinedIcon />
            </p>
          </div>
        </div>
      </BellowHeader1>
    </div>
  );
};

export default Design1BellowHeader;
