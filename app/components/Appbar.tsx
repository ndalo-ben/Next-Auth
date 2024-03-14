import { Button, Link, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react"
import SignInButton from "./SignInButton"

const Appbar = () => {
    return (
        <Navbar isBordered>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link href="/" color="foreground">
                        Home
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
               <SignInButton></SignInButton>
            </NavbarContent>
        </Navbar>
    )
}

export default Appbar