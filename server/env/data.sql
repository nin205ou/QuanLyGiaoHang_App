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
