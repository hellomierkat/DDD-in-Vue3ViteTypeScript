import { storage } from "./storage"

const loginJump = {

    GetJumpPathNameByRole(): string {
        if (storage.getCurrentUserRole() == "user") {
            return "orderCreate"
        }

        return "home-orders";
    }


}

export {
    loginJump
}