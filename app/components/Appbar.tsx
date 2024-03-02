import { Button, Link, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react"

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
                <Button as={Link} color="primary" href="/auth/signup" variant="flat">
                    Sign up
                </Button>
            </NavbarContent>
        </Navbar>
    )
}

export default Appbar