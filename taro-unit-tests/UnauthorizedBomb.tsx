import { ErrorWithHTML } from "../../backend/boardapi";

export default function UnauthorizedBomb(): JSX.Element {
    throw new ErrorWithHTML(401, 'Unauthorized');
}