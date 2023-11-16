-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2023 at 09:56 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `library`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `author` varchar(255) NOT NULL,
  `field` varchar(255) NOT NULL,
  `publication_date` date NOT NULL,
  `pdf_url` varchar(255) NOT NULL,
  `image_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `name`, `description`, `author`, `field`, `publication_date`, `pdf_url`, `image_url`) VALUES
(23, 'Frankenstein', 'Frankenstein tells the story of gifted scientist Victor Frankenstein who succeeds in giving life to a being of his own creation. However, this is not the perfect specimen he imagines that it will be, but rather a hideous creature who is rejected by Victor and mankind in general.', ' Mary Shelley', 'Gothic fiction, Science fiction, Horror fiction', '1818-01-01', '1683023312064.pdf', '1683023312063.jpg'),
(25, 'Half Dead Buried Alive', ' لماذا لا أرى إنعكاسى فى المرآة ؟؟؟؟ توقفت لدقيقة أنظر للمرآة بنوع من التركيز محاولا تأمل السطح المصقول وهل به مشاكل فى التنظيف !! لا جدوى من ذلك فإنعكاس باب الحمام يظهر بالمرآة ولكن انعكاسى هو الذى يظهر”\r\nرواية \"نصف ميت دفن حيا\" ستجدها مختلفه من البداية كما ان النهاية غير متوقعة ويصعب التكهّن بما تحمله .. أعتقد ان الكاتب لم يرد أن يستنتج القارئ النهاية حتى لو على سبيل المزاح .. أخفى النهاية عن القارئ بإحكام حتى جاءت تعلن عن الصدمة', 'Hassan AlJundi ', ' Novels And Literary Stories ', '2010-01-01', 'نصف ميت دفن حيًا_Foulabook.com_.pdf', 'e739915a29fe4c429947ce5337ed00b6.jpg'),
(26, 'Tarzan of the Apes', 'After being shipwrecked on the coast of Africa and separated from his parents an infant English aristocrat is raised in the jungle by a female ape. There he becomes more animal than human-learning to survive in the wild, communicate with jungle creatures and fight against dangerous predators. He is Tarzan of the Apes.', 'Edgar Rice Burroughs', 'Novel, Adventure fiction, Fantasy Fiction, Travel literature', '1912-10-01', '1683024559234.pdf', '1683024559232.jpg'),
(37, 'Harry Potter', 'Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry.', 'J.K. Rowling', 'Novel, Children\'s literature, Fantasy Fiction, High fantasy', '1997-07-26', 'Harry_Potter_(www.ztcprep.com).pdf', 'MV5BNmQ0ODBhMjUtNDRhOC00MGQzLTk5MTAtZDliODg5NmU5MjZhXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_FMjpg_UX1000_.jpg'),
(38, 'Anne of Green Gables', 'Set in the late 19th century, the novel recounts the adventures of 11 year old orphan girl Anne Shirley sent by mistake to two middle-aged siblings, Matthew and Marilla Cuthbert, who had originally intended to adopt a boy to help them on their farm in the fictional town of Avonlea in Prince Edward Island, Canada.', ' Lucy Maud Montgomery', 'Novel, Fiction, Children\'s literature, Bildungsroman', '1908-06-05', 'anne-of-green-gables.pdf', 'anne.jpg'),
(39, 'The Secret Garden', 'The gardens surrounding the large property are Mary\'s only escape. Then, Mary discovers a secret garden, surrounded by walls and locked with a missing key. With the help of two unexpected companions, Mary discovers a way in—and becomes determined to bring the garden back to life.', 'Frances Hodgson Burnett', 'Children\'s literature, Historical Fiction', '1911-01-01', 'The Secret Garden.pdf', 'ba0aaefbddf1e08b978f627ae49d8c22.jpg'),
(40, 'The Hobbit', 'he Hobbit is set in Middle-earth and follows home-loving Bilbo Baggins, the titular hobbit, who joins the wizard Gandalf and thirteen dwarves that make up Thorin Oakenshield\'s Company, on a quest to reclaim the dwarves\' home and treasure from the dragon Smaug.', 'J.R.R. Tolkien', 'Novel, Fantasy Fiction, High fantasy, Children\'s literature, Epic', '1937-09-21', 'The Hobbit (Enhanced Edition) - J. R. R. Tolkien.pdf', 'The-Hobbit-by-J.-R.-R.-Tolkien-1.jpg'),
(43, 'The Count of Monte Cristo', 'The Count of Monte Cristo by Alexandre Dumas centres on a man who is wrongfully imprisoned, escapes from jail, acquires a fortune, and sets about exacting revenge on those responsible for his imprisonment. First published in 1846, the story takes place in France, Italy, and islands in the Mediterranean during the historical events of 1815–1839: the era of the Bourbon Restoration through the reign of Louis-Philippe of France.', 'Alexandre Dumas, Auguste Maquet', 'Novel, Romance novel, Serialised Work, Adventure fiction, Historical Fiction', '1846-01-15', '1683024916856.pdf', '1683024916856.jpg'),
(44, 'The Lord of the Rings', 'A hobbit named Frodo inherits the One Ring, which can destroy the entire world. With the recently reawakened evil being Sauron after the ring to cement his reign, Frodo joins with eight others to destroy the Ring and defeat Sauron.', 'J. R. R. Tolkien', ' High fantasy; Adventure', '1954-06-29', 'Lord of the rings.pdf', '1683021187473.jpg'),
(45, 'Cosmos Book', 'Cosmos is a book about the Universe. It aims to help us understand the vast and complex world we live in. In this book, Sagan tells us about the way the Universe appeared and evolved, how the human species evolved and what we may achieve in the future.', 'Carl Sagan', ' Popular science', '1980-01-01', '1683033765147.pdf', '1683033765146.jfif');

-- --------------------------------------------------------

--
-- Table structure for table `book_chapters`
--

CREATE TABLE `book_chapters` (
  `id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `book_chapters`
--

INSERT INTO `book_chapters` (`id`, `book_id`, `title`, `description`) VALUES
(19, 23, 'The Beggining Chapter', 'The first meeting in the garden'),
(20, 23, 'The Beggining Chapter', 'The first meeting in the garden'),
(21, 23, 'The Beggining Chapter', 'The first meeting in the garden'),
(22, 23, 'The Middle Chapter', 'The first meeting in the garden'),
(23, 23, 'The Beginning', 'The first meeting in the garden.It was a sunny day.'),
(24, 23, 'The Middle Chapter', 'The first meeting in the garden'),
(25, 23, 'The Great Wall', 'this chapter is based on real story'),
(26, 23, 'The Middle Chapter', 'The first meeting in the garden'),
(27, 23, 'The Chapter Five', 'The first meeting in the garden'),
(28, 23, 'The Chapter Five', 'The first meeting in the garden'),
(29, 23, 'The Chapter Five', 'The first meeting in the garden'),
(30, 25, 'dddddddddddddddd', 'ddddddddddddddddddddddddddddddddddddd'),
(31, 25, 'cccccccccccc', 'ccccccccccccccccccccccccccccccccc'),
(32, 25, 'The Unknown Corpse', 'This is a new chapter with a new story'),
(33, 37, 'Harry Potter and the Sorcerer’s Stone', 'The first book in the Harry Potter series follows young wizard Harry Potter as he attends Hogwarts School of Witchcraft and Wizardry. There, he makes friends with Ron Weasley and Hermione Granger, and together they uncover a dark plot involving the Sorcerer’s Stone. Along the way, Harry discovers his own magical abilities and comes face to face with the evil Lord Voldemort.'),
(34, 37, 'Harry Potter and the Chamber of Secrets', 'Book 2 in the Harry Potter series picks up shortly after the events of the first book. Harry, Ron, and Hermione are back at Hogwarts for their second year and things are seemingly normal…until strange things start happening around school. Someone is opening the Chamber of Secrets, unleashing a deadly creature inside. It’s up to Harry and his friends to solve the mystery and put a stop to it before anyone else gets hurt.'),
(35, 37, 'Harry Potter and the Prisoner of Azkaban', 'Sirius Black, a dangerous wizard and escapee from Azkaban, is on the loose and Harry Potter is his target. This third installment in the Harry Potter series follows our young hero as he tries to stay safe while also uncovering the truth about Sirius Black. Along the way, Harry makes some surprising discoveries about himself and his family that will change everything he knows.'),
(36, 37, 'Harry Potter and the Goblet of Fire', 'The Tri-Wizard Tournament comes to Hogwarts in the fourth book of the Harry Potter series, and everyone is eager to see who will be chosen as the school’s champion. When Harry’s name is mysteriously pulled from the Goblet of Fire, he finds himself thrust into a competition he never signed up for. Worse yet, it seems like someone is trying to kill him.'),
(37, 37, 'Harry Potter and the Order of the Phoenix', 'The fifth book in the Harry Potter series follows our heroes as they enter their fifth year at Hogwarts. This year, things are different. Lord Voldemort is back and the wizarding world is in danger. The Order of the Phoenix, a secret society formed to protect the wizarding world from Voldemort, recruits Harry to help them in their fight. Along with his friends, Harry must face some of his darkest fears and learn just how strong he truly is.'),
(38, 37, 'Harry Potter and the Half-Blood Prince', 'Harry Potter is now in his sixth year at Hogwarts. Lord Voldemort is getting stronger and the wizarding world is in more danger than ever. Dumbledore enlists Harry’s help in a secret mission to uncover Voldemort’s past and learn more about his weaknesses. As they delve deeper into their investigation, things take a dark turn and tragedy strikes.'),
(39, 37, 'Harry Potter and the Deathly Hallows', 'In the final book of the Harry Potter series, everything comes to a head. Lord Voldemort is more powerful than ever and he will stop at nothing to find and kill Harry Potter. Harry, Ron, and Hermione set out on a dangerous quest to destroy all of Voldemort’s horcruxes in an effort to defeat him once and for all. But as they get closer to their goal, they realize that the true battle is just beginning.'),
(40, 40, 'The Hobbit: An Unexpected Journey', 'Bilbo Baggins gets a request from Gandalf to go on a journey. Later that night, a group of dwarves visited Bilbo\'s house.'),
(41, 40, 'The Hobbit: The Desolation of Smaug', 'Bilbo Baggins, a hobbit, and his companions face great dangers on their journey to Laketown. Soon, they reach the Lonely Mountain, where Bilbo comes face-to-face with the fearsome dragon Smaug.'),
(42, 40, 'The Hobbit: The Battle of the Five Armies ', 'Bilbo fights against a number of enemies to save the life of his Dwarf friends and protects the Lonely Mountain after a conflict arises.');

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE `request` (
  `id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `request` tinyint(2) NOT NULL DEFAULT 0 COMMENT '0 -> decline\r\n1 -> accept',
  `state` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0 -> pending\r\n1 -> Finished',
  `book_name` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `book_pdf` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `request`
--

INSERT INTO `request` (`id`, `book_id`, `user_id`, `request`, `state`, `book_name`, `user_name`, `book_pdf`, `token`) VALUES
(68, 23, 69, 0, 0, 'Frankenstein', 'Ali Mohammed', 'http://localhost:3000/1683023312064.pdf', 'f955a94881c49ffa22ed1769e491e3dd'),
(69, 26, 69, 0, 0, 'Tarzan of the Apes', 'Ali Mohammed', 'http://localhost:3000/1683024559234.pdf', 'f955a94881c49ffa22ed1769e491e3dd'),
(70, 43, 69, 0, 0, 'The Count of Monte Cristo', 'Ali Mohammed', 'http://localhost:3000/1683024916856.pdf', 'f955a94881c49ffa22ed1769e491e3dd'),
(71, 39, 20, 0, 0, 'The Secret Garden', 'Waleed Ramy', 'http://localhost:3000/The Secret Garden.pdf', '70c49ce1b11850e16508b3d16107b2cd'),
(76, 40, 69, 0, 0, 'The Hobbit', 'Ali Mohammed', 'http://localhost:3000/The Hobbit (Enhanced Edition) - J. R. R. Tolkien.pdf', 'f955a94881c49ffa22ed1769e491e3dd');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'o -> in-active user\r\n1 -> active user',
  `type` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'o -> normal user\r\n1 -> admin user',
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `status`, `type`, `token`) VALUES
(2, 'ahmed mohamed', 'ahmedmohammed1212@gmail.com', 'ahmed123456789ahmed', '01004222152', 1, 0, ''),
(3, 'ahmed mohammed', 'ahmedmohammed@gmail.com', '$2b$10$2NChZZxg0zAL.lksAOPQaejVEifN3NAWsh/XzDgHJkqJ5nT3iR4Rq', '01004222154', 1, 0, ''),
(4, ' Mohammed Malik', 'mohammedmalik@gmail.com', '1234567890', '01002225486', 1, 1, 'd8f9eb494fc4ac306211c062be3bcc7e'),
(5, 'mohammed ahmed', 'ahmedGamal@gmail.com', '$2b$10$NEs.AeoaHmEsAVzZ1VRve.4bq/DAfzjh7oH8/kMXM59E9/Gbj15U2', '01111111111', 1, 0, ''),
(6, 'mohammed ahmed', 'ahmedgamal11@gmail.com', '$2b$10$uKNPMzYMlG5pnf6zQDRYiepiDVe6/w0i5e/kRi3lu5TpbZJcF8glW', '', 1, 1, ''),
(9, 'mohammed ahmed', 'ahmedgamal@gmail.com', '$2b$10$5gaWdTm9sWDjiL43OcDEzOubUKHe8.Ky0Dwcf1pQnmH2d.TSnjkbi', '', 0, 1, ''),
(10, 'ahmed gmal', 'gamal@gmail.com', '$2b$10$lZnEtez/.OT0b864WFUDLe7vxPLT5e7kmXcNwUcBElDp3DkQ1dkEK', '', 1, 1, ''),
(11, 'admin admin', 'admin@admin.com', '$2b$10$DHlIAsOsbpTNpeBuPiRzzert8nO3p4qYYhmAB9Bq5DWQIKJFNMS7G', '', 0, 1, ''),
(14, 'admin user', 'adminuser@admin.com', '$2b$10$U988aFFIr/U3NAKxmTwNne.AJYf32am5WI4lwIp2jaOUxRizX4eL6', '', 1, 1, '5401a2143a5f9e3c38ffc5b042982dd4'),
(15, 'admin user', 'adminuser@admin.com', '$2b$10$BB0WCSic4vg4nVlFAveWA.TfWLBuU8j3vXeoLygdtDoUSYdfLi48m', '', 0, 0, '82956c6ed58cac20a63ff847a40f5b1c'),
(16, ' Mohammed Malik', 'mohammedmalik@gmail.com', 'Malik12345_12', '01002225486', 1, 0, ''),
(17, 'admin user', 'adminuser2@admin.com', '$2b$10$hItJ/3GuflgNvbZRubHp0OWhqej1qwmFDoTURKUfdHPbxSrkQBr1O', '', 0, 0, '4675ab91cb0a690f0d0cac6de0193d81'),
(18, 'admin user', 'adminuser2@admin.com', '$2b$10$5vtCLrSNqmInJ9CHOB6yf.YHmUNXqRoLnk6hpgJ5ej8w2ENWKW7wi', '', 1, 0, '303d91c186fade8dae8c2c85901ab6fc'),
(19, 'admin Maged', 'adminuse2@admin.com', '$2b$10$yEYQQ4frqDJbxNfZ58B0zORYsUJ4hv6FKgnUkCE3j4/v9T4IMWEgC', '01007777775', 0, 0, 'c169fad436c961f9d68a7bb16b8e8413'),
(20, 'Waleed Ramy', 'waleedramy@gmail.com', '$2b$10$fJevYDytAJBw3lDKVOAUn.n852xrbYErPTHubDKEiXdgiGS7hnAka', '01234456785', 1, 0, '70c49ce1b11850e16508b3d16107b2cd'),
(21, ' Mohammed Malik', 'mohammedmalik@gmail.com', 'Malik12345_12', '01002225486', 0, 0, ''),
(22, 'Zain Saeed', 'zainsaeed@gmail.com', '$2b$10$xGxFYRBWi1aUfxe3KQRcBuClTH7ng2FXmAYI6c4rTM3fxH8leCht.', '01222222222', 1, 0, '49efd8ad4f7de688bf31902a49c8b122'),
(23, ' Mohammed Malik', 'mohammedmalik@gmail.com', 'Malik12345_12', '01002225486', 1, 1, ''),
(24, 'Malik Malik', 'malik1111@gmail.com', '$2b$10$iML6k1YnSPtYzNfMhRr5Eun5Mt0PiomGRrSpBwZqvbOLhvW8Oq0vm', '01002222225', 1, 1, '73648aae61a3e0a85bbba1221f2aff1e'),
(25, 'Gamal Gamal', 'gamalgamal@gmail.com', '$2b$10$O9zkdc58hry5VfjUBH/D2eiq/08TTLjhHI6G2z/SuXB5l4gVVrX.S', '01144444449', 0, 1, '4458fd876b29a0a4568798f01a9b1473'),
(26, 'ali ali ali', 'aliali@gmail.com', '$2b$10$ClDGsfelz2sZA9dH7S534.XGFGC/Ut3AcXD5hR8U804NGFaVxQGmW', '0126666666', 1, 0, 'a4a810498055fa8d4faed30237d3e823'),
(27, 'kamal kamal', 'kamal1234@gamil.com', '$2b$10$eYN9euVD5FMwm1EplC0tsen3vY2lULgUVyMECNdIGePvTNNy/mV6S', '01005555555', 0, 0, '8f1b956d8455afd5cd1b67bfa24688eb'),
(28, 'Kamal Kamal', 'kamal@gmail.com', '$2b$10$3xl0fH89GlqY6/Lqku28QegLzJ1a6pf4Yuru5kGRakr5bhtwmTei2', '0125555555', 1, 0, 'db3ca64806749c272d1b43387f6c4f40'),
(29, 'Waleed Waleed', 'waleed@gmail.com', '$2b$10$ShBHCJEdHurRa8at/IAVFurebsdfwM.Lm93AZ9esYbzxok1JLZEGS', '01006666666', 0, 0, '496e58fa09912cc740682a29ab089966'),
(30, ' Mohammed Malik', 'mohammedmalik@gmail.com', 'Malik12345_12', '01002225486', 1, 0, ''),
(31, ' Mohammed Malik', 'mohammedmalik@gmail.com', 'Malik12345_12', '01002225486', 0, 0, ''),
(32, 'admin Maged', 'adminuse2@admin.com', '$2b$10$pqFmqiNpSGD7jUPiGaJyC.drNvQKIaIclA8LarQQTZGf1tIKuP.rm', '01007777775', 1, 0, 'de72d30f9472430c7451d9d04b1380bd'),
(33, ' Mohammed Malik', 'mohammedmalik@gmail.com', 'Malik12345_12', '01002225486', 0, 0, ''),
(34, ' Mohammed Malik', 'mohammedmalik@gmail.com', 'Malik12345_12', '01002225486', 1, 0, ''),
(35, ' Mohammed Malik', 'mohammedmalik@gmail.com', 'Malik12345_12', '01002225486', 0, 0, ''),
(36, ' Malik Mohammed', 'mohammedmalik1245@gmail.com', 'Malik12345_12', '01002225486', 1, 0, ''),
(37, ' Malik Mohammed', 'mohammedmalik1245@gmail.com', 'Malik12345_12', '01002225486', 0, 1, ''),
(38, ' Malik Mohammed', 'mohammedmalik1245@gmail.com', 'Malik12345_12', '01002225486', 1, 1, ''),
(39, ' Malik Mohammed', 'mohammedmalik1245@gmail.com', 'Malik12345_12', '01002225486', 0, 1, ''),
(40, ' Malik Mohammed', 'mohammedmalik1245@gmail.com', 'Malik12345_12', '01002225486', 1, 1, ''),
(41, ' Malik Mohammed', 'mohammedmalik1245@gmail.com', 'Malik12345_12', '01002225486', 0, 1, ''),
(42, ' Malik Mohammed', 'mohammedmalik1245@gmail.com', 'Malik12345_12', '01002225486', 1, 0, ''),
(43, ' Malik Mohammed', 'mohammedmalik1245@gmail.com', 'Malik12345_12', '01002225486', 0, 1, ''),
(44, ' Mohammed Malik', 'mohammedmalik@gmail.com', 'Malik123456', '01002225486', 1, 0, ''),
(45, ' Mohammed Malik', 'mohammedmalik@gmail.com', 'Malik123456', '01002225486', 0, 0, ''),
(61, 'admin Maged', 'adminuse2@admin.com', '$2b$10$2cTehm3yK2YRwDryk7uYlOUsllJJdZ8mbyDxxnQ3.Q8a1DJUoZac.', '01007777775', 0, 0, 'ef3efbce8a70ca64380008d972dbe91f'),
(62, 'admin Maged Mo', 'adminuse21@admin.com', '$2b$10$FCjhW5yS4zn4VhwFO4yyJ.P..Gb5bcFjbBZgut7HdP8zJRxjrSC0a', '01007777775', 0, 0, '7c8f4f115eb329204591ed8400a3e97d'),
(63, 'admin Maged Mo', 'adminuse24@gmail.com', '$2b$10$tLePNXwokQ8uVZ7IDgzUL.HVSDGjpc9WrBnry2GGLfiwy6ONA0AWq', '01007777775', 0, 0, '18f5ad8b66ecfbb909fc5a2da2279e0b'),
(67, 'Aliaa Adel Ali', 'alaiOmacccr@gmail.com', 'aldeaaa1234568', '01004557841', 1, 0, ''),
(69, 'Ali Mohammed', 'alimohammed@gmail.com', '$2b$10$DGQfApIr2O23ER1j2RH.5.n6e2I1ncKH5rzw04MpBhr9k.4oIjtiy', '01007777775', 1, 0, 'f955a94881c49ffa22ed1769e491e3dd'),
(70, 'Radwa Mansour', 'radwamansour@gmail.com', '$2b$10$LpvXtur6ztt4bUld/FhoKOSxFZU0NVBmCMutFGwspi58b881vmJ5y', '01119696853', 1, 0, '2929069dfb87d36e9c4ad3d7e6ac4455');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `book_chapters`
--
ALTER TABLE `book_chapters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chapter_constr_id` (`book_id`);

--
-- Indexes for table `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_constr_id` (`user_id`),
  ADD KEY `book_constr_id` (`book_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `book_chapters`
--
ALTER TABLE `book_chapters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `request`
--
ALTER TABLE `request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `book_chapters`
--
ALTER TABLE `book_chapters`
  ADD CONSTRAINT `chapter_constr_id` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `request`
--
ALTER TABLE `request`
  ADD CONSTRAINT `book_constr_id` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_constr_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
