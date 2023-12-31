import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  Design2BodySec1,
  Design2BodySec2,
  Design2BellowHeader,
} from "../../components/TokensPage";
import { useRouter } from "next/router";
import {
  fetchNftImgAction,
  fetchTokensAction,
  selectAccount,
  selectSpecificToken,
  selectTokens,
} from "app/reducers/AccountSlice";
import ErrorPage from "components/ErrorPage/ErrorPage";

const TokenDetailPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { tokenId } = router.query;
  // if (!tokenId) {
  //   router.push("/");
  // }

  const tokens = useAppSelector(selectTokens);
  const account = useAppSelector(selectAccount);
  const specificToken = useAppSelector(selectSpecificToken(tokenId as string));

  useEffect(() => {
    if (!tokens.length) {
      dispatch(fetchTokensAction());
    }
  }, [dispatch, account]);

  useEffect(() => {
    if (specificToken && !specificToken.image && tokenId) {
      const tokenURI: string = specificToken.current_token_data?.token_uri;
      dispatch(fetchNftImgAction(tokenURI, tokenId as any));
    }
  }, [dispatch, specificToken]);

  return (
    <>
      {account ? (
        <>
          <Design2BellowHeader specificToken={specificToken} />
          <Design2BodySec1 specificToken={specificToken} />
          <Design2BodySec2 specificToken={specificToken} />
        </>
      ) : (
        <>
          <ErrorPage />
        </>
      )}
    </>
  );
};

export default TokenDetailPage;
