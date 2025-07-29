import { Loader } from "@mantine/core";
import { primaryColors } from "@utils/colors";

export default function CustomLoader() {
    return (
        <div className="w-full h-[10vh] flex items-center justify-center"><Loader width={"100%"} color={primaryColors.DEFAULT} /></div>

    )
}
