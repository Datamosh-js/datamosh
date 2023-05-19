# Contributing

Jump in the pit and add something new!

## Adding a Mode

By adding a new mode, you will be creating a new file which exports a function that manipulates data extracted from a source image's bitmap. That may sound like a lot, but it'll essentially come down to basic iteration over a buffer. Starter code has been provided [here](https://github.com/mster/datamosh/blob/master/lib/modes/template).

### Experimenting

Your mosh mode doesn't have to do anything specific -- if you think it's cool, we probably will too. Use your imagination and feel free to experiment!

Most of Datamosh's current modes overwrite existing Red/Green/Blue (RGB) pixel values with something random. If you get stuck or just need some inspiration, check out these examples.

-   [Vana mode](https://github.com/mster/datamosh/blob/master/lib/modes/vana.js)
-   [Schifty mode](https://github.com/mster/datamosh/blob/master/lib/modes/schifty.js)
-   [Before and after images](https://github.com/mster/datamosh#example-images)

Once you have a stub function and some cool name for it, you'll want to import it into Datamosh.

To import your mode, you have two options:

1. Import it into Datamosh by adding an entry in `mosh.MODES`, [here](https://github.com/mster/datamosh/blob/master/lib/mosh.js#L99). (Preferred)
2. Add it to the function property after you initialize Datamosh. Example code on how to do this can be found [here](https://github.com/mster/datamosh/releases/tag/v1.1.0).

### Getting Started

1. Fork datamosh and run `npm install` within the directory.
2. On your fork, create a new branch named `username/work-description`, where `username` is your GitHub username and `work-description` is a short description for your contribution.

    For example: `mster/new-mode`

3. Commit your work to the branch you created.
4. When you're ready for review or to submit your contribution, double check a few things.

-   ✓ First, make sure your fork is up to date. If your fork is out of date, you will need to rebase.

-   ✓ Next, assure that your code pases `npm test`.

5. If your contribution is more than a single commit, squash all commits into one.
6. Open a pull request to `mster:master`.

## Other Features

Have an feature in mind? Go for it -- if we like it, we will add it.

Follow the [Getting Started](#getting-started) guide if you're new to this.

## Code Style

Datamosh uses [Prettier](https://prettier.io/). To have your contributions accepted, they must also be in StandardJS style.

To test if your code passes, run the test command:
`npm run lint`

## Testing

As of v1.0.0, tests consist of:

-   linting using Prettier

## Need Help

We're happy to help out, no matter how small. Open an issue, ping the author (@mster), or join the Discord.

Datamosh has a dedicated Discord server. Feel free to join: https://discord.gg/DhYTmMD
