I recently bought a used PC from a friend on which I eager to install Debian Linux.   Like a true Linux nerd, after I got everything installed, I opened port 22 for remote ssh access.  Little did I know, in less than 24 hours I would become a victim of international terrorism, or at least my new server was.<br />
<br />
Just out of curiosity, I checked to see if any attempts have been made to access my computer from the outside.  Looking at my /var/logs, noticed some interesting entries:<br />
<br />
20:14:19 localhost sshd[1588]: Illegal user iqbal from 85.132.13.186<br />
20:14:22 localhost sshd[1590]: Illegal user kazal from 85.132.13.186<br />
20:14:29 localhost sshd[1592]: Illegal user almuslim from 85.132.13.186<br />
20:14:33 localhost sshd[1594]: Illegal user sayed from 85.132.13.186<br />
20:14:40 localhost sshd[1596]: Illegal user pacific from 85.132.13.186<br />
<br />
In a mannor of four minutes, 63 attempts were made to access my server with the following usernames: ab_siddique, akbar, almuslim, anwar, ashok, asraful, atiq, badol, bokul, chanchal, dilwar, dulal, emon, extern, f_ahammad, faruk77, ferdous, feroj, giasuddin, habib, habibur, iqbal, jahir, jakir, kazal, khabir, kh_mamun, khorshed, mahbub, mamun, masud, missionaleybeley, monir, pacific, qa, rajon, ripon, rsilk, s_ahallad2005, sangit, sayed, scan, selim, shagor, shahid, shakhawat, shamsul, shanjhbela, tanvir, tawfiq, theone, zahid, and zero.<br />
<br />
A quick tractroute search reviled the illegal login attempts originated from Afghanistan.   It's beyond me why they used Arabic names to attack a U.S. based server.  Whatever the reason, 63 login attempts from Afghanistan in less than four minutes is impressive.  For this type of scan, the "hackers" must be running some sort of sophisticated multithreaded brute force script.  After some research, I found that the problem typically used is called <a href="http://isc.sans.org/diary.html?date=2004-08-22&amp;isc=53171744599bc98a896a32305ebe5d9c">brutessh</a> and is <a href="http://www.google.com/search?q=brutessh">readily available</a> to download.<br />
<br />
So what happens when a username and password is successfully cracked?  Well, the guys over at <a href="http://www.securityfocus.com/infocus/1876">securityfocus</a> decided to find out.  They set up a honeypot, sat back, and watched as their servers fell prey to the attacks.  From the article,<br />
<br />
"<span class="body">Once a valid account name/password was determined, the attacker logged into the honeypot via SSH and proceeded to download an SSH scanner tool. [...] </span><span class="body"></span><br />
<br />
After the initial scan, the attacker proceeded to download and install an IRC Bot. IRC Bots are tools that can control a compromised system remotely via IRC chat channels that the compromised system is set to listen to. Using IRC to control a compromised system is much more covert than using SSH directly, as the attacker does not have to directly log into the system anymore. Further, it allows the attacker to control several such systems, also known as Zombies, at the same time.<br />
<br />
The conversations in the IRC channel revealed that the Zombies were used to scan class B networks with an SSH scanner just like the one that had been downloaded to our honeypot. During a period of a couple of hours, four class B networks were scanned with the SSH scanner from various IRC Bots, identifying thousands of SSH servers. A scan took approximately 700 seconds to complete.  [...]<br />
<br />
<span class="body"><strong>Combined with an army of IRC bots, an attacker only needs 525 Zombies to scan the entire IP4 of today's public Internet in just one day.</strong> If you have a publicly accessible SSH server, you are very likely to be targeted by one of these attacks."</span><br />
<br />