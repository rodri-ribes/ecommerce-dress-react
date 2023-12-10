import { useMutation } from "@tanstack/react-query";

export function useShoppingCart() {

    const buynowMutation = useMutation(["buynow"])

    return {
        buynowMutation
    }
}