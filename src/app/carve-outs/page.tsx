import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({
  title,
  href,
  children,
}: {
  title: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export const metadata = {
  title: 'Carve Outs',
  description: 'Books, gadgets, and other stuff I recommend.',
}

export default function CarveOuts() {
  return (
    <SimpleLayout
      title="Books, gadgets, and other stuff I recommend."
      intro={
        <>
          This page was inspired by my favorite podcast,{' '}
          <a
            className="text-zinc-800 underline dark:text-zinc-100"
            href="https://www.acquired.fm"
          >
            Acquired.fm
          </a>
          . At the end of every episode they share their “carve outs” -
          essentially recommendations for stuff they&apos;ve found cool lately.
          As a big nerd with high standards for what I buy, I have more than a
          few carve outs of my own. Here&apos;s a big list of all of my favorite
          stuff.
        </>
      }
    >
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool title="Lenovo ThinkPad X1 Carbon (Gen 10), Intel i7 Processor, 16GB RAM">
            I&apos;ve been a die-hard Windows user for years. That may be a
            controversial opinion in this line of work, but I stand by it. I
            love the (slightly-more) open ecosystem, and I love using the same
            OS for both work and personal projects. Plus, my parents both run
            Windows and they always seem to need technical support.
            <br />
            <br />
            Windows aside, I actually wouldn&apos;t recommend this particular
            laptop. It&apos;s noisy and the battery life is bad. My old ThinkPad
            didn&apos;t have these issues, nor does my work machine (the
            enterprise workhorse T-14).
          </Tool>
          <Tool title="LG UltraFine 32 Inch 4K Monitor">
            I freaking love this monitor. It&apos;s simple and high resolution.
            I tried many other monitors before eventually landing on this one.
            I&apos;ve had the dual monitor setup, and there are advantages to
            that, but with two computers connected via a KVM switch, there were
            just too many cables and it made my workspace feel cluttered.
            <br />
            <br />I also tried a massive 45 inch curved LG OLED. It was a sweet
            monitor, the perfect size. The only problem was the pixel density.
            It was QHD but there was so much screen space that the resolution
            was actually worse than on my old FHD 24 inch monitors. Someday,
            when 4K or even 8K becomes the norm in these massive curved
            monitors, I&apos;ll get one. But for right now, the LG I have is
            perfect.
          </Tool>
          <Tool title="Logitech K750 Wireless Solar Keyboard">
            After getting tired of constantly recharging my old keyboard, I
            bought this solar-powered one. I&apos;ve had it for over a year and
            haven&apos;t had to charge it once. I like the laptop-like feel
            better, like on the MX Master, but it&apos;s worth it not to
            constantly be plugging it in.
          </Tool>
          <Tool title="FlexiSpot Standing Desk - 60 Inch">
            As someone with horrible posture, this was a game changer. When I
            feel myself slouching, I&apos;ll make myself stand for punishment.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Books">
          <Tool title="The Art of Fielding by Chad Harbach">
            A novel set along the coast of Lake Michigan in Wisconsin, where
            I&apos;m from, it follows a young baseball player through college.
            Beautifully written and you fall in love with the characters. If you
            don&apos;t like baseball, I still think you&apos;d enjoy this book.
            If you do like baseball, check it out from the library today.
          </Tool>
          <Tool title="The Time Traveller's Wife by Audrey Neffeneger">
            One of my favorite books of all time. It follows two protagonists,
            Henry and Clare. Henry is (no surprise) a time traveller. Not only
            is the prose and character development great, but the author&apos;s
            take on time travel is really interesting.
            <br />
            <br />
            I&apos;ve both read this book and listened to the audiobook. I
            recommend both, and if you like audiobooks, this is one of the best.
            The narrators split the parts of Henry and Clare, and both have
            awesome voices. I imagine if Henry and Clare were real, these would
            be their voices.
          </Tool>
          <Tool title="The Mistborn Saga">
            I&apos;m a huge fantasy nerd and this trilogy is my favorite.
            Sanderson is all about world-building. He crafts clever characters
            and even-cleverer plots. I&apos;ve read it twice and devoured it
            both times.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Apps">
          <Tool title="Flighty (iOS)">
            I&apos;ve been using this app for a couple of years now, and
            it&apos;s fantastic. It tracks upcoming flights, keeps a record of
            past flights for fun end-of-year data on how many times you&apos;ve
            flown around the globe, and it&apos;s got a beautiful UI. Flighty
            will usually notify me of flight changes before my airline. They do
            put a fair number of features behind a pay wall, but I&apos;ve been
            happy with what&apos;s included for free.
          </Tool>
          <Tool title="Tailscale">
            TL;DR: Tailscale provides private peer-to-peer networking. It&apos;s
            easy to setup and use. Use it to remote into other devices on your
            network or use it like a traditional VPN to encrypt traffic on
            unsecure networks. It&apos;s built on WireGuard and is free to use.
            <br />
            <br />
            How is this different from a regular VPN? Unlike a traditional VPN,
            there&apos;s no single VPN server. All the devices on the network
            are interconnected. I primarily use this in two ways: (1) To route
            traffic through an exit node. This operates similar to a traditional
            VPN where all your traffic gets routed through the exit node;
            although, instead of needing to be a dedicated server, any device on
            the network can be made an exit node, even your phone. (2) Accessing
            other devices on the network. Commonly, I&apos;ll use this to test
            the mobile experience of web apps that I&apos;m developing on my
            desktop.
            <br />
            <br />
            Credit to my friend Daniel for recommending it to me. He said,
            &quot;I budgeted a whole afternoon to setting it up and it ended up
            only taking me 20 minutes.&quot; It requires basically zero setup
            and everything just works. If you&apos;ve been wanting your own VPN,
            I recommend giving Tailscale a shot.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
