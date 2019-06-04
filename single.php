<?php 
get_header(); 
if (have_posts()) : the_post();
    $categoryObj = get_the_category($post->ID);
    the_author();
    echo get_the_date('M j, Y');
    the_title();
    the_content();
endif;
get_footer(); 
?>