-- role table
INSERT INTO `delivery_app_db`.`api_role` (`id`, `name`, `description`) VALUES (1, 'Admin', NULL);
INSERT INTO `delivery_app_db`.`api_role` (`id`, `name`, `description`) VALUES (2, 'Customer', NULL);
INSERT INTO `delivery_app_db`.`api_role` (`id`, `name`, `description`) VALUES (3, 'Shipper', NULL);

-- Type delivery table
INSERT INTO `delivery_app_db`.`api_typedelivery` (`id`, `name`, `price`, `additional_fee_per_500gram`, `max_time`, `description`) VALUES (1, 'Hỏa tốc', 32000.00, 8000.00, '6 giờ', 'Dịch vụ hỏa tốc cam kết giao hàng cực nhanh trong tỉnh trong vòng 6 giờ.');
INSERT INTO `delivery_app_db`.`api_typedelivery` (`id`, `name`, `price`, `additional_fee_per_500gram`, `max_time`, `description`) VALUES (2, 'Nội tỉnh nhanh', 22000.00, 6000.00, '12 giờ', 'Giao nhanh chóng trong tỉnh trong vòng 12 giờ.');
INSERT INTO `delivery_app_db`.`api_typedelivery` (`id`, `name`, `price`, `additional_fee_per_500gram`, `max_time`, `description`) VALUES (3, 'Nội tỉnh tiết kiệm', 16500.00, 4000.00, '1 ngày', 'Giao hàng tiết kiệm trong tỉnh.');

-- Status order table
INSERT INTO `delivery_app_db`.`api_statusorder` (`id`, `code`, `name`) VALUES (1, 1, 'Chờ thanh toán');
INSERT INTO `delivery_app_db`.`api_statusorder` (`id`, `code`, `name`) VALUES (2, 2, 'Chờ lấy hàng');
INSERT INTO `delivery_app_db`.`api_statusorder` (`id`, `code`, `name`) VALUES (3, 3, 'Đang chuyển hàng');
INSERT INTO `delivery_app_db`.`api_statusorder` (`id`, `code`, `name`) VALUES (4, 4, 'Đã giao thành công');
INSERT INTO `delivery_app_db`.`api_statusorder` (`id`, `code`, `name`) VALUES (5, 0, 'Lấy hàng thất bại');
INSERT INTO `delivery_app_db`.`api_statusorder` (`id`, `code`, `name`) VALUES (6, -1, 'Giao hàng thất bại');

-- Payment Methods table
INSERT INTO `delivery_app_db`.`api_paymentmethod` (`id`, `name`, `image`) VALUES (1, 'Momo', 'payment_methods/MoMo_Logo.png');
INSERT INTO `delivery_app_db`.`api_paymentmethod` (`id`, `name`, `image`) VALUES (2, 'ZaloPay', 'payment_methods/Logo-ZaloPay-Square.png');
INSERT INTO `delivery_app_db`.`api_paymentmethod` (`id`, `name`, `image`) VALUES (3, 'Internet Banking', 'payment_methods/vnpay-logo-inkythuatso-01-13-16-26-42.jpg');
INSERT INTO `delivery_app_db`.`api_paymentmethod` (`id`, `name`, `image`) VALUES (4, 'Tiền mặt', 'payment_methods/cash.png');

-- User basic 
INSERT INTO `api_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_active`, `date_joined`, `avatar`, `phone_number`, `cccd`, `address`, `is_staff`, `role_id`) VALUES (3, 'pbkdf2_sha256$720000$heMAsW1aRYeeGJQQNkhMjh$2+DmacfxDPmrypQZEBE+kasnZ74+Eeks60kZA6M0IRQ=', '2024-05-03 12:45:59.637281', 1, 'admin2', '', '', 'admin2@gmail.com', 1, '2024-05-02 14:31:32.918555', '', NULL, NULL, NULL, 1, 1);
INSERT INTO `api_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_active`, `date_joined`, `avatar`, `phone_number`, `cccd`, `address`, `is_staff`, `role_id`) VALUES (17, 'pbkdf2_sha256$720000$525FToEDb0QnZNzQWzfyqN$NePvc+yGNpG4hBekUM4qPsJb70Mq5clJbe4Eba6CDO4=', NULL, 0, 'nhi', 'ba', 'tung', 'nhi@gmail.com', 1, '2024-05-06 16:15:44.349803', '', '0315465489', '', 'qre', 0, 2);
INSERT INTO `api_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_active`, `date_joined`, `avatar`, `phone_number`, `cccd`, `address`, `is_staff`, `role_id`) VALUES (19, 'pbkdf2_sha256$720000$aaXb5BE4KoT9XXVKNEM5nK$ywLo8wXb46EEFK80Epfg+qgCzfx/H4aYNfKMpleOv08=', NULL, 0, 'thanh', '', 'thanhthanh', 'thanh@gmail.com02', 1, '2024-05-07 03:28:51.038522', '', '0254564564', '12', 'quận 8', 0, 2);
INSERT INTO `api_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_active`, `date_joined`, `avatar`, `phone_number`, `cccd`, `address`, `is_staff`, `role_id`) VALUES (23, 'pbkdf2_sha256$720000$LGPdXwIu1UxWwc3YozFz5E$ksXNZJd6W/WjVYKKkhRTxAKAHCO8pDxGGGzg6kuLOsI=', NULL, 0, 'nin', 'nin', 'bùi', 'vannin2907lc@gmail.com', 1, '2024-05-10 23:12:28.315589', '', '0337407745', '049505668889', 'quận 7', 0, 3);
INSERT INTO `api_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_active`, `date_joined`, `avatar`, `phone_number`, `cccd`, `address`, `is_staff`, `role_id`) VALUES (24, 'pbkdf2_sha256$720000$fgNj9YnisN9OBUVPgllSay$gryCXBQp58f35Zty7AZZWnAdJvVMqnIh+Qo0hYJrKgw=', NULL, 0, 'aoi', 'aoi nhi', 'nhanh', 'aoi@gmail.com', 1, '2024-05-12 14:36:52.683611', '', '0136545624', '015546546543', 'nhà mặt phố', 0, 3);